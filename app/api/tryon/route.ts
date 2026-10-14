// app/api/tryon/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";

// GEMINI_API_KEY は環境変数から自動読み込みされます
const ai = new GoogleGenAI();

interface TryOnRequestBody {
  userImage: string;     // Base64 Data URL または 生Base64
  garmentImage: string;  // ローカルパス (/images/...) または 外部URL または Base64
  garmentName?: string;
  category?: string;
  garmentColor?: string;
}

function parseBase64(input: string): { data: string; mimeType: string } {
  const match = input.match(/^data:([^;]+);base64,(.*)$/);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  return { mimeType: "image/jpeg", data: input };
}

async function resolveGarmentImage(garmentImage: string): Promise<{ data: string; mimeType: string }> {
  // 1. 外部URLの場合
  if (garmentImage.startsWith("http://") || garmentImage.startsWith("https://")) {
    const res = await fetch(garmentImage);
    if (!res.ok) {
      throw new Error(`Failed to fetch garment image: ${res.statusText}`);
    }
    const buffer = await res.arrayBuffer();
    const mimeType = res.headers.get("content-type") || "image/png";
    return { data: Buffer.from(buffer).toString("base64"), mimeType };
  }

  // 2. ローカル静的パス (/images/...) の場合
  if (garmentImage.startsWith("/")) {
    const filePath = path.join(process.cwd(), "public", garmentImage);
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(garmentImage).toLowerCase();
    const mimeType = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
    return { data: fileBuffer.toString("base64"), mimeType };
  }

  // 3. すでにBase64の場合
  return parseBase64(garmentImage);
}

export async function POST(req: NextRequest) {
  try {
    const body: TryOnRequestBody = await req.json();
    const { 
      userImage, 
      garmentImage, 
      garmentName = "GAP Garment", 
      category = "tops", 
      garmentColor = "" 
    } = body;

    if (!userImage || !garmentImage) {
      return NextResponse.json(
        { error: "ユーザー写真と商品画像の両方が必要です。" },
        { status: 400 }
      );
    }

    // 1. ユーザー写真のBase64パース
    const parsedUser = parseBase64(userImage);

    // 2. 商品画像のBase64解決
    const parsedGarment = await resolveGarmentImage(garmentImage);

    // 3. マルチモーダル構成（Part 1: 商品画像 → Part 2: ユーザー写真 → Part 3: 指示）
    const parts = [
      {
        inlineData: {
          mimeType: parsedGarment.mimeType,
          data: parsedGarment.data,
        },
      },
      {
        inlineData: {
          mimeType: parsedUser.mimeType,
          data: parsedUser.data,
        },
      },
      {
        text: `[TASK: VIRTUAL TRY-ON EDIT]
- Reference Garment: Image 1 (${garmentName}, category: ${category}${garmentColor ? `, color: ${garmentColor}` : ""})
- Target Person: Image 2

Instructions:
Replace the top worn by the person in Image 2 with the exact garment shown in Image 1.
Preserve 100% of the target person's facial features, identity, posture, and body proportions.
Transfer the garment's texture, logo, neckline, and fit accurately with natural cloth folds and matching ambient lighting. Output only the photorealistic composite image.`,
      },
    ];

    // 4. モデル呼び出し
    const response = await ai.models.generateContent({
      model: "gemini-nano-banana-2.1", // 必要に応じて "gemini-3.1-flash-lite-image" 等に変更可
      contents: { parts },
      config: {
        systemInstruction: `You are an expert photorealistic fashion stylist and virtual try-on neural engine.
Your task is to realistically dress the human subject from the second image (Target Person) in the exact garment shown in the first image (Reference Garment).
1. Subject Identity: Preserve 100% of the target person's facial features, skin tone, hair, head shape, hands, and biological proportions.
2. Pose & Geometry: Retain the exact body posture, shoulder angle, head tilt, and arm positions of the target person.
3. Garment Fidelity: Accurately replicate the reference garment's silhouette, sleeve length, collar/neckline construction, fabric texture, seam lines, exact color hues, and graphic prints.
4. Natural Drape & Interaction: Warp and drape the garment realistically around the subject's torso.
5. Lighting & Harmonization: Match directional lighting and shadows.`,
        temperature: 0.2,
        imageConfig: {
          aspectRatio: "3:4",
          imageSize: "1K",
        },
      },
    });

    // 5. 生成された画像バイナリを抽出
    let resultBase64: string | null = null;
    let resultMimeType = "image/png";

    const candidateParts = response.candidates?.[0]?.content?.parts;
    if (candidateParts) {
      for (const part of candidateParts) {
        if (part.inlineData?.data) {
          resultBase64 = part.inlineData.data;
          resultMimeType = part.inlineData.mimeType || resultMimeType;
          break;
        }
      }
    }

    if (!resultBase64) {
      const textOutput = candidateParts?.find((p) => p.text)?.text;
      return NextResponse.json(
        { error: textOutput || "画像生成が完了しましたが、画像データを取得できませんでした。" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: `data:${resultMimeType};base64,${resultBase64}`,
    });
  } catch (err: any) {
    console.error("[TryOn Route Handler Error]:", err);
    return NextResponse.json(
      { error: err.message || "画像生成中に内部エラーが発生しました。" },
      { status: 500 }
    );
  }
}
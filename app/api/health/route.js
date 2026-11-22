import { aiConfigured, answerJudgeModel } from "@/lib/answer-judge";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ ok: true, aiConfigured: aiConfigured(), answerJudgeModel: answerJudgeModel() });
}

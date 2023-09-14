import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"
export async function transcribe(audio) {
  try {
    //return transcriptionExample
    console.log("Realizando a transcrição...")
    const transcribe = await pipeline(
      "automatic-speech-recognition", // compreenção da fala
      "Xenova/whisper-small" // modelo
    )

    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe", // transcrição
    })

    console.log("Transcrição finalizada com sucesso...")

    return transcription?.text.replace("[Música]", "") // ? em caso de retornar nada , não quebra a aplicação.
  } catch (error) {
    throw new Error(error)
  }
}

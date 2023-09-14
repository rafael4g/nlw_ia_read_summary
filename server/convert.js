import fs from "fs" // manipular arquivos
import wav from "node-wav" // manipular conversão do video
import ffmpeg from "fluent-ffmpeg" // manipular conversão do audio
import ffmpegStatic from "ffmpeg-static" // para setar o dado bruto de fluent-ffmpeg
import { rejects } from "assert"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, rejects) => {
    console.log("Convertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1) // primeira posição do vetor na lista recebida
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath) // lendo o arquivo
        const fileDecoded = wav.decode(file) // decodificar o arquivo em código

        const audioData = fileDecoded.channelData[0] // pegando apenas o Audio indice 0
        const floatArray = new Float32Array(audioData) // convertendo em format para IA utilizar

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)

        fs.unlinkSync(outputPath) // remove o arquivo
      })
      .on("error", (error) => {
        console.log("Erro ao converter o video", error)
        rejects(error)
      })
      .save(outputPath)
  })

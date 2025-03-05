import { Router, Request, Response } from 'express';
import { getDadosAtivo, inserirDadosAtivo } from "./db";
import { miner } from './miner';
import { isHoliday } from './utilcalendar';

const router = Router();

// Defina suas rotas:
router.get("/", async (req, res) => {
  res.json({
    project: "api-bmfbovespa",
    author: "Felipe Morais",
  });
});


interface MinerResult {
  date: string;
  result: any[];
}


/* router.post("/miner", async (req: Request, res: Response): Promise<void> => {
  const { ativo, referenceDate, referenceDateFinal } = req.body;

  if (!ativo || !referenceDate) {
    res.status(400).json({
      error: "Os campos 'ativo' e 'referenceDate' são obrigatórios."
    });
    return;
  }

  try {
    const results: MinerResult[] = [];

    if (referenceDateFinal) {
      let currentDate = new Date(referenceDate);
      const endDate = new Date(referenceDateFinal);

      if (currentDate > endDate) {
        res.status(400).json({
          error: "A 'referenceDateFinal' deve ser igual ou posterior a 'referenceDate'."
        });
        return;
      }

      while (currentDate <= endDate) {
        if (isHoliday(currentDate)) {
          console.log(`Data ${currentDate.toLocaleDateString()} é feriado ou fim de semana, pulando mineração.`);
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1)
          .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        
        try {
          const minerResult = await miner(ativo, formattedDate);
          if (!minerResult || minerResult.length === 0) {
            console.log(`Nenhum dado processado para ${formattedDate}, indo para a próxima data.`);
          } else {
            results.push({ date: formattedDate, result: minerResult });
          }
        } catch (minerError: unknown) {
          if (minerError instanceof Error) {
            console.log(`Erro durante a mineração para ${formattedDate}: ${minerError.message}`);
          } else {
            console.log(`Erro durante a mineração para ${formattedDate}: ${String(minerError)}`);
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      const singleDate = new Date(referenceDate);
      if (isHoliday(singleDate)) {
        res.status(200).json({
          message: `A data ${referenceDate} é feriado ou fim de semana, mineração não realizada.`,
          data: []
        });
        return;
      }
      const formattedDate = `${singleDate.getFullYear()}-${(singleDate.getMonth()+1)
        .toString().padStart(2, '0')}-${singleDate.getDate().toString().padStart(2, '0')}`;
      
      try {
        const minerResult = await miner(ativo, formattedDate);
        if (minerResult && minerResult.length > 0) {
          results.push({ date: formattedDate, result: minerResult });
        } else {
          console.log(`Nenhum dado processado para ${formattedDate}.`);
        }
      } catch (minerError: unknown) {
        if (minerError instanceof Error) {
          console.log(`Erro durante a mineração para ${formattedDate}: ${minerError.message}`);
        } else {
          console.log(`Erro durante a mineração para ${formattedDate}: ${String(minerError)}`);
        }
      }
    }

    res.status(200).json({
      message: "Mineração concluída com sucesso!",
      data: results
    });
    return;
  } catch (error) {
    res.status(500).json({
      error: "Erro ao executar a mineração."
    });
    return;
  }
}); */

router.post("/miner", async (req: Request, res: Response): Promise<void> => {
  const { ativo, referenceDate, referenceDateFinal } = req.body;

  if (!ativo || !referenceDate) {
    res.status(400).json({
      error: "Os campos 'ativo' e 'referenceDate' são obrigatórios."
    });
    return;
  }

  // Responde imediatamente que a requisição está em processamento
  res.status(202).json({
    message: "Requisição em processamento"
  });

  // Processa a mineração em segundo plano
  setImmediate(async () => {
    try {
      const results: MinerResult[] = [];

      if (referenceDateFinal) {
        let currentDate = new Date(referenceDate);
        const endDate = new Date(referenceDateFinal);

        if (currentDate > endDate) {
          console.error("A 'referenceDateFinal' deve ser igual ou posterior a 'referenceDate'.");
          return;
        }

        while (currentDate <= endDate) {
          if (isHoliday(currentDate)) {
            console.log(`Data ${currentDate.toLocaleDateString()} é feriado ou fim de semana, pulando mineração.`);
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
          }

          const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1)
            .toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

          try {
            const minerResult = await miner(ativo, formattedDate);
            if (minerResult && minerResult.length > 0) {
              results.push({ date: formattedDate, result: minerResult });
            } else {
              console.log(`Nenhum dado processado para ${formattedDate}.`);
            }
          } catch (minerError) {
            console.error(`Erro durante a mineração para ${formattedDate}:`, minerError);
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        const singleDate = new Date(referenceDate);
        if (isHoliday(singleDate)) {
          console.log(`A data ${referenceDate} é feriado ou fim de semana, mineração não realizada.`);
          return;
        }

        const formattedDate = `${singleDate.getFullYear()}-${(singleDate.getMonth()+1)
          .toString().padStart(2, '0')}-${singleDate.getDate().toString().padStart(2, '0')}`;

        try {
          const minerResult = await miner(ativo, formattedDate);
          if (minerResult && minerResult.length > 0) {
            results.push({ date: formattedDate, result: minerResult });
          } else {
            console.log(`Nenhum dado processado para ${formattedDate}.`);
          }
        } catch (minerError) {
          console.error(`Erro durante a mineração para ${formattedDate}:`, minerError);
        }
      }

      console.log("Mineração concluída:", results);
    } catch (error) {
      console.error("Erro ao executar a mineração:", error);
    }
  });
});





router.get("/asset/:asset", async (req, res) => {
  const { asset } = req.params;
  try {
    const data = await getDadosAtivo(asset);
    res.status(200).json(data);
  } catch (error) {
    console.error(`Erro ao consultar dados de ${asset}:`, error);
    res.status(500).json({ error: "Erro ao consultar dados" });
  }
});

export default router;

export function isHoliday(date: Date): boolean {
    const year = date.getFullYear() /*   + 1   */;

    const holidays = [
       `${year}-01-01`, // Confraternização Universal
       `${year}-01-25`, // Aniversário SP
       `${year}-04-21`, // Tiradentes
       `${year}-05-01`, // Dia do Trabalho
       `${year}-07-09`, // Data Magna do Estado de São Paulo
       `${year}-09-07`, // Independência do Brasil
       `${year}-10-12`, // Nossa Senhora Aparecida
       `${year}-11-02`, // Finados
       `${year}-11-15`, // Proclamação da República
       `${year}-11-20`, // Consciência Negra
       `${year}-12-25`, // Natal
      // Adicione outros feriados fixos ou variáveis aqui, inclusive feriados estaduais ou municipais,
      // por exemplo, o aniversário da cidade de São Paulo (25/01) ou Corpus Christi.
    ];
  
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      return true;
    }
  
    const dateStr = date.toISOString().split(`T`)[0];
    return holidays.includes(dateStr);
  }
  
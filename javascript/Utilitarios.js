export function formatarDataHoraBrasileira(dataHoraString) {
  let dataHora = new Date(dataHoraString);

  let dia = dataHora.getDate();
  let mes = dataHora.getMonth() + 1;
  let ano = dataHora.getFullYear();
  let horas = dataHora.getHours();
  let minutos = dataHora.getMinutes();

  // Formatação com zero à esquerda para valores menores que 10
  dia = dia < 10 ? '0' + dia : dia;
  mes = mes < 10 ? '0' + mes : mes;
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;

  let dataFormatada = dia + '/' + mes + '/' + ano;
  let horaFormatada = horas + ':' + minutos;

  return dataFormatada + ' ' + horaFormatada;
}
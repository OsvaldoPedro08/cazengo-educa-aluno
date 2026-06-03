export function formatTimeAgo(dateInput : string | number | Date) : string {

    const now = new Date();
    const createdDate = new Date(dateInput);

    //diferença em milesegundos
    const differenceInMs = now.getTime() - createdDate.getTime();

    //se por algum motivo o relogio do usuario estiver atrasado
    if(differenceInMs < 0) return 'Agora mesmo';

    //conversoes de tempo
    const seconds = Math.floor(differenceInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    //regra de exibicao progressiva
    if(seconds < 60) {
        return 'Agora mesmo';
    }

    if(minutes < 60) {
        return minutes === 1 ? 'há 1 minuto' : `há ${minutes} minutos`;
    }

    if(hours < 24) {
        return hours === 1 ? 'há 1 hora' : `há ${hours} horas`;
    }

    if(days < 30) {
        return days === 1 ? 'há 1 dia' : `há ${days} dias`;
    }

    //se passar de um mês, exibe a data padrão formatada (ex.: 24/05/2026)
    return createdDate.toLocaleDateString('pt-PT');
}
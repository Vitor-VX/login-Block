const time_LoginBlock_verific = (timeDataBase, timeExpire) => {
    const date = new Date()
    const timeHorarioDataBase = new Date(timeDataBase)

    const diferenca_Milissegundos = date - timeHorarioDataBase
    const diferenca_Segundos = Math.floor(diferenca_Milissegundos / 1000);
    return diferenca_Segundos > timeExpire ? true : false
}

const systemBlockLogin = async (cliente, timeBlock, operation = 'block') => {
    switch (operation) {
        case 'block':
            const currentTime = new Date()
            const blockTime = new Date(currentTime.getTime() + timeBlock);
            cliente.block_login = blockTime;
            break;
        case 'unlock':
            cliente.block_login = null
            cliente.tentativas = 5
            break;
        case 'decrement-tries':
            cliente.tentativas--;
            break;
        case 'reset-tries':
            cliente.tentativas = 5;
            break;
    }

    await cliente.save();
    return;
}

module.exports = {
    time_LoginBlock_verific,
    systemBlockLogin
}

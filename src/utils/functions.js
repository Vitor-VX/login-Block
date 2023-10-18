const time_LoginBlock_verific = (timeDataBase, timeExpire) => {
    const date = new Date()
    const timeHorarioDataBase = new Date(timeDataBase)

    const diferenca_Milissegundos = date - timeHorarioDataBase
    const diferenca_Segundos = Math.floor(diferenca_Milissegundos / 1000);
    return diferenca_Segundos > timeExpire ? true : false
}

module.exports = {
    time_LoginBlock_verific
}
const tabelas = require("./tabelas")

const almoco = tabelas.tipo.build({tipo: "almoço"})
const doces = tabelas.tipo.build({tipo: "doces"})
const salgado = tabelas.tipo.build({tipo: "salgado"})
const lanches = tabelas.tipo.build({tipo: "lanches"})
const porcoes = tabelas.tipo.build({tipo: "porções"})
const refri = tabelas.tipo.build({tipo: "refrigerantes/sucos"})
const cerveja = tabelas.tipo.build({tipo: "cervejas"})


almoco.save()
doces.save()
salgado.save()
lanches.save()
porcoes.save()
refri.save()
cerveja.save()


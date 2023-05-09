const express = require('express')
const cors = require('cors')
const app = express()
const Home = require('./modelos/home')
const Clientes = require('./modelos/clientes')
const Dependentes = require("./modelos/dependentes")
const router = express.Router()
router.use(express.urlencoded({extended: true}))
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8082;
let DataHome = {};
let codcli 


app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next()
})

// consulta e geração do json para o fe

app.get('/', async (req, res) => {
  try {
    const result = await Home.findOne({
      order: [
        ['id', 'DESC']
      ],
    });

    DataHome = {
      text_one: result.text_one,
      text_two: result.text_two,
      text_three: result.text_three,
      btn_title: result.btn_title,
      btn_link: result.btn_link,
    };

    res.json({
      success: true,
      datahome: DataHome
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar dados.'
    });
  }
});



// recebe os dados do formulario e envia para o banco de dados.

app.post('/add-home', bodyParser.urlencoded({ extended: true }), async (req, res) => {
  const textOne = req.body.text_one;
  const textTwo = req.body.text_two;
  const textThree = req.body.text_three;
  const btnTitle = req.body.btn_title;
  const btnLink = req.body.btn_link;

  // faça o que desejar com os dados do formulário
  try {
    const result = await Home.create({
      text_one: textOne,
      text_two: textTwo,
      text_three: textThree,
      btn_title: btnTitle,
      btn_link: btnLink
    });
    res.send('Formulário enviado com sucesso!');
  } catch (error) {
    console.error(error);
    res.send('Erro ao enviar o formulário!');
  }
});

// recebe os dados do cadastro de clientes e envia para o banco de dados.

app.post('/add-cliente', bodyParser.urlencoded({ extended: true }), async (req, res) => {
      
  const nomcli = req.body.nom_cli
  const cpfcli = req.body.cpf_cli
  const endcli = req.body.end_cli
  const baicli = req.body.bai_cli
  const cidcli = req.body.cid_cli
  const telcli = req.body.tel_cli
  
  /*const stacli = req.body.sta_cli*/// desabilitado pois o valor será inserido direto
  
      
  // faça o que desejar com os dados do formulário
  try {
    const result = await Clientes.create({
    nom_cli: nomcli,
    cpf_cli: cpfcli,
    end_cli: endcli,
    bai_cli: baicli,
    cid_cli: cidcli,
    tel_cli: telcli,
    sta_cli: 'A'
    });
    console.log('resultado da inserção:',result);
    res.redirect(`http://127.0.0.1:5501/arquvos/cadastro_de_passageiros/cadastroPassageiro.html?clienteId=${result.id}&end_cli=${result.end_cli}`);

  //  res.redirect(`http://127.0.0.1:5501/arquvos/cadastro_de_passageiros/cadastroPassageiro.html?clienteId=${result.id}`);
  } catch (error) {
    console.error(error);
    res.status(error).send(body)
  }
});


// recebe os dados do cadastro de dependentes e envia para o banco de dados.

app.post('/add-dependente', bodyParser.urlencoded({ extended: true }), async (req, res) => {

  const nomdep = req.body.nom_dep
  const enddep = req.body.end_dep
  const dtndep = req.body.dtn_dep
  const teldep = req.body.tel_dep
  const sexdep = req.body.sex_dep
  const pardep = req.body.par_dep // parentesco
  const rotid  = req.body.roteiroId
  const cliid  = req.body.clienteId
      
 
  /*const stacli = req.body.sta_cli*/
  
      
  // faça o que desejar com os dados do formulário
  try {
    const result = await Dependentes.create({

      nom_dep: nomdep,
      end_dep: enddep,
      dtn_dep: dtndep,
      tel_dep: teldep,
      sex_dep: sexdep,
      par_dep: pardep,
      roteiroId: rotid,
      clienteId: cliid,
    
    });
    console.log('resultado da inserção:',result);
    res.redirect(`http://127.0.0.1:5501/index.html`);
  } catch (error) {
    console.error(error);
    res.send('Erro ao enviar o formulário! ', error);
  }
});

// Rota no servidor para verificar se o cpf ja existe

app.get('/verificar-cpf/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  // Verifica se o CPF já está cadastrado no banco de dados
  const cliente = await Clientes.findOne({ where: { cpf_cli: cpf } });

  if (cliente) {
    // CPF já cadastrado, retorna uma mensagem de erro
    res.status(400).json({ message: 'CPF já cadastrado' });
  } else {
    // CPF não cadastrado, retorna uma resposta vazia com código 200
    res.status(200).send();
  }
});

// inicia o servidor
app.listen(8082, ()=>{
    console.log('servidor iniciado na porta: 8082: http//localhost:8082 ')
})
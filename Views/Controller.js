// Importando as bibliotecas e modelos necessários
const express = require('express'); // Importando o framework Express para criar o servidor
const bodyParser = require('body-parser'); // Importando o middleware para análise de corpo de requisição
const cors = require('cors'); // Importando o middleware para lidar com políticas de origem cruzada (CORS)
const { sequelize, User, Aluno, Avaliacao, Acomodacao, Potencialidade } = require('../models'); // Importando os modelos de banco de dados
const { Op } = require('../models'); // Importando os operadores de consulta Sequelize

// Criando uma instância da aplicação Express
const app = express();

// Configurando middlewares
app.use(cors()); // Permitindo requisições de origens diferentes
app.use(bodyParser.urlencoded({ extended: false })); // Configurando o parser de URL codificada
app.use(bodyParser.json()); // Configurando o parser de JSON para o corpo da requisição

// Verificando a conexão com o banco de dados Sequelize
sequelize
  .authenticate() // Chamando o método 'authenticate' do Sequelize para verificar a conexão
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Definindo a rota para criar um novo usuário
app.post('/create', async (req, res) => {
  try {
    const { nameUser, emailUser, passwordUser } = req.body; // Capturando dados do corpo da requisição

    // Verificar se o e-mail já está em uso consultando o banco de dados
    const existingUser = await User.findOne({ where: { email: emailUser } });
    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }

    // Criar um novo usuário no banco de dados usando o modelo 'User'
    const newUser = await User.create({
      name: nameUser,
      email: emailUser,
      password: passwordUser,
      // Outros campos do usuário
    });

    console.log('Novo usuário criado:', newUser);

    return res.json({ message: 'Usuário criado com sucesso.' }); // Responder com uma mensagem de sucesso
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

// Definindo a rota para efetuar o login
app.post('/login', async (req, res) => {
  try {
    const { emailUser, passwordUser } = req.body; // Capturando dados do corpo da requisição

    // Procurar um usuário no banco de dados com o email fornecido
    const user = await User.findOne({ where: { email: emailUser } });

    if (user && user.password === passwordUser) {
      return res.json({ message: 'Login successful' }); // Responder com mensagem de sucesso
    } else {
      return res.status(401).json({ error: 'Invalid email or password' }); // Responder com erro de credenciais inválidas
    }
  } catch (error) {
    console.error('Erro ao efetuar login:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

// Definindo a rota para cadastrar um novo aluno


// Definindo a rota para buscar todos os usuários

// Definindo a rota para excluir um usuário


app.post('/createAluno', async (req, res) => {
  try {
    const { nome_aluno } = req.body; // Capturando dados do corpo da requisição

    // Criar um novo aluno no banco de dados usando o modelo 'Aluno'
    const newAluno = await Aluno.create({
      nome_aluno: nome_aluno,
      // Outros campos do aluno
    });

    console.log('Novo aluno criado:', newAluno);

    return res.json({ message: 'Aluno criado com sucesso.' }); // Responder com uma mensagem de sucesso
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

app.post('/createAvaliacao', async (req, res) => {
  try {
    const { avaliacao, ativo, alunoId, data_inicio, data_fim } = req.body; // Capturando dados do corpo da requisição

    // Criar uma nova avaliação no banco de dados usando o modelo 'Avaliacao'
    const newAvaliacao = await Avaliacao.create({
      avaliacao: avaliacao,
      ativo: ativo,
      alunoId: alunoId,
      data_inicio: data_inicio,
      data_fim: data_fim
    });

    console.log('Nova avaliação criada:', newAvaliacao);

    return res.json({ message: 'Avaliação criada com sucesso.' }); // Responder com uma mensagem de sucesso
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

app.get('/alunos/search/:name', async (req, res) => {
  try {
    const { name } = req.params; // Capturing data from the request parameters

    // Query students by name using the 'findAll' method of the 'Aluno' model
    const alunos = await Aluno.findAll({
      where: {
        nome_aluno: name
      }
    });

    console.log('Alunos encontrados:', alunos);

    return res.json({ message: 'Alunos encontrados com sucesso.', alunos }); // Respond with a success message and the list of students
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Respond with internal server error
  }
});

app.delete('/alunos/delete/:id', async (req, res) => {
  try {
    const { id } = req.params; // Capturando dados dos parâmetros da requisição

    // Deletar aluno pelo id usando o método 'destroy' do modelo 'Aluno'
    const aluno = await Aluno.destroy({
      where: {
        id: id
      }
    });

    console.log('Aluno deletado:', aluno);

    return res.json({ message: 'Aluno deletado com sucesso.' }); // Responder com uma mensagem de sucesso
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

app.get('/alunos', async (req, res) => {
  try {
    // Buscar todos os alunos usando o método 'findAll' do modelo 'Aluno'
    const alunos = await Aluno.findAll();

    console.log('Alunos:', alunos);

    return res.json({ alunos: alunos }); // Responder com a lista de alunos
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' }); // Responder com erro interno do servidor
  }
});

app.get('/avaliacoes/search/:avaliacao', async (req, res) => {
  try {
    const { avaliacao } = req.params;

    // Query avaliações por nome usando o modelo 'Avaliacao'
    const avaliacoes = await Avaliacao.findAll({
      where: {
        avaliacao: avaliacao
      }
    });

    console.log('Avaliações encontradas:', avaliacoes);

    return res.json({ message: 'Avaliações encontradas com sucesso.', avaliacoes });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Altere a rota para deletar uma avaliação
app.delete('/avaliacoes/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deletar avaliação pelo ID usando o modelo 'Avaliacao'
    const avaliacao = await Avaliacao.destroy({
      where: {
        id: id
      }
    });

    console.log('Avaliação deletada:', avaliacao);

    return res.json({ message: 'Avaliação deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/avaliacoes', async (req, res) => {
  try {
    // Query para buscar todas as avaliações
    const avaliacoes = await Avaliacao.findAll();

    return res.json({ message: 'Todas as avaliações encontradas.', avaliacoes });
  } catch (error) {
    console.error('Erro ao buscar todas as avaliações:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


app.post('/createAcomodacao', async (req, res) => {
  try {
    const { acomodacao, ativo, alunoId, data_inicio, data_fim } = req.body;

    // Criar uma nova acomodação no banco de dados usando o modelo 'Acomodacao'
    const newAcomodacao = await Acomodacao.create({
      acomodacao: acomodacao,
      ativo: ativo,
      alunoId: alunoId,
      data_inicio: data_inicio,
      data_fim: data_fim
    });

    console.log('Nova acomodação criada:', newAcomodacao);

    return res.json({ message: 'Acomodação criada com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

app.get('/acomodacoes/search/:acomodacao', async (req, res) => {
  try {
    const { acomodacao } = req.params;

    // Consultar acomodações por nome usando o modelo 'Acomodacao'
    const acomodacoes = await Acomodacao.findAll({
      where: {
        acomodacao: acomodacao
      }
    });

    console.log('Acomodações encontradas:', acomodacoes);

    return res.json({ message: 'Acomodações encontradas com sucesso.', acomodacoes });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para excluir uma acomodação
app.delete('/acomodacoes/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deletar acomodação pelo ID usando o modelo 'Acomodacao'
    const acomodacao = await Acomodacao.destroy({
      where: {
        id: id
      }
    });

    console.log('Acomodação deletada:', acomodacao);

    return res.json({ message: 'Acomodação deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// Rota para buscar todas as acomodações
app.get('/acomodacoes', async (req, res) => {
  try {
    // Consultar todas as acomodações usando o modelo 'Acomodacao'
    const acomodacoes = await Acomodacao.findAll();

    return res.json({ message: 'Todas as acomodações encontradas.', acomodacoes });
  } catch (error) {
    console.error('Erro ao buscar todas as acomodações:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


app.post('/createPotencialidade', async (req, res) => {
  try {
    const { descricao, ativo, alunoId, data_inicio, data_fim } = req.body;

    console.log('Dados recebidos do cliente:');
    console.log('descricao:', descricao);
    console.log('ativo:', ativo);
    console.log('alunoId:', alunoId);
    console.log('data_inicio:', data_inicio);
    console.log('data_fim:', data_fim);

    // Criar uma nova potencialidade no banco de dados usando o modelo 'Potencialidade'
    const newPotencialidade = await Potencialidade.create({
      descricao: descricao,
      ativo: ativo,
      alunoId: alunoId,
      data_inicio: data_inicio,
      data_fim: data_fim
    });


    console.log('Nova potencialidade criada:', newPotencialidade);

    return res.json({ message: 'Acomodação criada com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


app.get('/potencialidades/search/:potencialidade', async (req, res) => {
  try {
    const { potencialidade } = req.params;

    // Consultar potencialidades por descrição usando o modelo 'Potencialidade'
    const potencialidades = await Potencialidade.findAll({
      where: {
        descricao: potencialidade
      }
    });

    console.log('Potencialidades encontradas:', potencialidades);

    return res.json({ message: 'Potencialidades encontradas com sucesso.', potencialidades });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para excluir uma potencialidade
app.delete('/potencialidades/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Deletar potencialidade pelo ID usando o modelo 'Potencialidade'
    const potencialidade = await Potencialidade.destroy({
      where: {
        id: id
      }
    });

    console.log('Potencialidade deletada:', potencialidade);

    return res.json({ message: 'Potencialidade deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para buscar todas as potencialidades
app.get('/potencialidades', async (req, res) => {
  try {
    // Consultar todas as potencialidades usando o modelo 'Potencialidade'
    const potencialidades = await Potencialidade.findAll();

    return res.json({ message: 'Todas as potencialidades encontradas.', potencialidades });
  } catch (error) {
    console.error('Erro ao buscar todas as potencialidades:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// Iniciando o servidor
const port = process.env.PORT || 3000; // Definindo a porta do servidor
app.listen(port, () => {
  console.log('Servidor Rodando'); // Iniciando o servidor e exibindo mensagem no console
});



import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;


app.use(cors()); // Middleware para permitir solicitações de origens diferentes (CORS)
app.use(express.json()); // Middleware para analisar o corpo da requisição

// Dados de exemplo
const users = [
  {
    "id": 1,
    "name": "joão",
    "username": "na",
    "email": "joão7@gmail.com",
    "phone": "1199456356",
    "website": "gdhddhl.com"
  },
  {
    "id": 2,
    "name": "yuri",
    "username": "yud",
    "email": "yuri@gmail.com",
    "phone": "1199456356",
    "website": "fsfsl.com"
  },
  {
    "id": 3,
    "name": "renan",
    "email": "rena@gmail.com",
    "phone": "1247479595",
    "website": "fs.com"
  }
];

// Endpoint para obter todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
}); 

// Endpoint para obter um usuário por ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Endpoint para adicionar um novo usuário
app.post('/users', (req, res) => {
  const userData = req.body;
  const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Gera um novo ID
  const newUser = { id: newUserId, ...userData }; // Cria um novo usuário com o ID gerado
  
  users.push(newUser); // Adiciona o novo usuário à lista de usuários
  
  res.status(201).json(newUser); // Responde com o novo usuário criado e o status 201 (Created)
});


// Endpoint para editar um usuário
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const userIndex = users.findIndex(user => user.id === parseInt(userId));
  
  console.log("Dados recebidos:", userData); // Adiciona um log para verificar os dados recebidos
  
  if (userIndex !== -1) {
    // Atualiza apenas os campos específicos do usuário
    users[userIndex] = { ...users[userIndex], ...userData };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});



// Endpoint para excluir um usuário por ID
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex(user => user.id === parseInt(userId));

  if (userIndex !== -1) {
    // Remove o usuário da lista de usuários
    users.splice(userIndex, 1);
    res.json({ message: 'Usuário excluído com sucesso' });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

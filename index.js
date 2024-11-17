import express from 'express';
import path from 'path';

const host ='0.0.0.0';
const porta = 3000;

let listaUsuarios=[];

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'publico')));

function cadastrarEmpresa(requisicao, resposta){
    const cnpj = requisicao.body.cnpj;
    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    if(cnpj && razaoSocial && nomeFantasia && endereco && cidade && uf && cep && email && telefone){
        listaUsuarios.push({
            cnpj : cnpj,
            razaoSocial : razaoSocial,
            nomeFantasia : nomeFantasia,
            endereco : endereco,
            cidade : cidade,
            uf : uf,
            cep : cep,
            email : email,
            telefone : telefone
        });
        resposta.redirect('/listarUsuarios');
    }
    else
    {
        resposta.write(`<!DOCTYPE html>
        <html lang="pt-br">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Empresas</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
        </head>
        
        <body>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Início</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cadastro.html">Cadastro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/listarUsuarios">Relatório</a>
                </li>
            </ul>
            <br>
            <br>
            <div class="container">
                <h1>Cadastro de Empresas</h1>
                <form method="post" action="/cadastrarEmpresa" class="row g-3">
                    <div class="col-md-4">
                        <label for="cnpj" class="form-label">CNPJ</label>
                        <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}" required>`);
         if (cnpj == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, informe o CNPJ da empresa.
                             </div>`
                            );
         }
         resposta.write(`</div>
                         <div class="col-md-4">
                         <label for="razaoSocial" class="form-label">Razão Social ou Nome do Fornecedor</label>
                         <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="${razaoSocial}" required>`) ; 
         if (razaoSocial == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
              Por favor, informe a Razão social ou Nome do fornecedor da empresa.
            </div>`);
         } 
         resposta.write(`</div>
                         <div class="col-md-4">
                         <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                         <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="${nomeFantasia}" required>`);

         if (nomeFantasia == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                             Por favor, informe o Nome Fantasia da empresa.
                            </div>`);
         }  
         resposta.write(`</div>
                         <div class="col-md-6">
                         <label for="endereco" class="form-label">Endereço</label>
                         <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}" required>`);
         
        if (endereco == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o endereço da empresa.
                            </div>`);
        } 
        resposta.write(` </div>
                         <div class="col-md-4">
                         <label for="cidade" class="form-label">Cidade</label>
                         <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" required>`); 
        
        if (cidade == ""){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe a cidade da empresa.
                            </div>`);
        } 
        resposta.write(` </div>
                         <div class="col-md-2">
                         <label for="uf" class="form-label">UF</label>
                         <select class="form-select" id="uf" name="uf" required>
                         <option selected disabled value=${uf}>Selecione</option>
                         <option value="AC">Acre</option>
                         <option value="AL">Alagoas</option>
                         <option value="AP">Amapá</option>
                         <option value="AM">Amazonas</option>
                         <option value="BA">Bahia</option>
                         <option value="CE">Ceará</option>
                         <option value="DF">Distrito Federal</option>
                         <option value="ES">Espírito Santo</option>
                         <option value="GO">Goiás</option>
                         <option value="MA">Maranhão</option>
                         <option value="MT">Mato Grosso</option>
                         <option value="MS">Mato Grosso do Sul</option>
                         <option value="MG">Minas Gerais</option>
                         <option value="PA">Pará</option>
                         <option value="PB">Paraíba</option>
                         <option value="PR">Paraná</option>
                         <option value="PE">Pernambuco</option>
                         <option value="PI">Piauí</option>
                         <option value="RJ">Rio de Janeiro</option>
                         <option value="RN">Rio Grande do Norte</option>
                         <option value="RS">Rio Grande do Sul</option>
                         <option value="RO">Rondônia</option>
                         <option value="RR">Roraima</option>
                         <option value="SC">Santa Catarina</option>
                         <option value="SP">São Paulo</option>
                         <option value="SE">Sergipe</option>
                         <option value="TO">Tocantins</option>
                         </select>`); 
                       
        if (!uf){
            resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, selecione um estado.
                            </div>`);
        }    
       resposta.write(` </div>
                        <div class="col-md-4">
                        <label for="cep" class="form-label">CEP</label>
                        <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>`); 
                        
       if (cep == ""){
        resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o cep.
                            </div>`);
       }
       
       resposta.write(`</div>
                       <div class="col-md-4">
                       <label for="email" class="form-label">Email</label>
                       <input type="email" class="form-control" id="email" name="email" value="${email}" required>`);
        
       if (email == ""){
        resposta.write(`<div class="alert alert-danger" role="alert">
                            Por favor, informe o email.
                            </div>`);
       }
       
       resposta.write(`</div>
                       <div class="col-md-4">
                       <label for="telefone" class="form-label">Telefone</label>
                       <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}" required>`);

       if (telefone == ""){
        resposta.write(`<div class="alert alert-danger" role="alert">
                         Por favor, informe o telefone da empresa.
                         </div>`);
       } 
       resposta.write(`</div>
                       <div class="col-12">
                       <button class="btn btn-primary" type="submit">Cadastrar Empresa</button>
                       <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                       </form>
                 </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
             integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
             crossorigin="anonymous"></script>

    </html>`); 
    resposta.end();    
    }

}   
app.post('/cadastrarEmpresa',cadastrarEmpresa);

app.get('/listarUsuarios', (req, resp) => {
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<title>Resultado do cadastro</title>');
    resp.write('<meta charset="utf-8">');
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>Lista de Empresas</h1>');
    resp.write('<table class="table table-striped">');
    resp.write('<tr>');
    resp.write('<th>CNPJ</th>');
    resp.write('<th>Razão Social</th>');
    resp.write('<th>Nome Fantasia</th>');
    resp.write('<th>Endereço</th>');
    resp.write('<th>Cidade</th>');
    resp.write('<th>UF</th>');
    resp.write('<th>CEP</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('</tr>');

    for (let i = 0; i < listaUsuarios.length; i++) {
        resp.write('<tr>');
        resp.write(`<td>${listaUsuarios[i].cnpj}</td>`);
        resp.write(`<td>${listaUsuarios[i].razaoSocial}</td>`);
        resp.write(`<td>${listaUsuarios[i].nomeFantasia}</td>`);
        resp.write(`<td>${listaUsuarios[i].endereco}</td>`);
        resp.write(`<td>${listaUsuarios[i].cidade}</td>`);
        resp.write(`<td>${listaUsuarios[i].uf}</td>`);
        resp.write(`<td>${listaUsuarios[i].cep}</td>`);
        resp.write(`<td>${listaUsuarios[i].email}</td>`);
        resp.write(`<td>${listaUsuarios[i].telefone}</td>`);
        resp.write('</tr>');
    }

    resp.write('</table>');
    resp.write('<a href="/">Voltar</a>');
    resp.write('</body>');
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>');
    resp.write('</html>');
    resp.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor Rodando em http://${host}:${porta}`);
});
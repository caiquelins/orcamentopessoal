//classe Despesa
class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano; 
		this.mes = mes; 
		this.dia = dia; 
		this.tipo = tipo; 
		this.descricao = descricao; 
		this.valor = valor; 
	}

	//método utilizado para validar se os dados preenchidos são válidos
	validarDados() {
		//o for in vai percorrer this, que nada mais é que todos os elementos da classe despesa, exemplo tipo, ano, mes
		for(let i in this) {
			//quando fazemos this[i], será retornado o elemento + o valor dele, por exemplo this.ano = 2021
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false;
			}
		}
		return true;
	}
}

class Bd {

	constructor() {
		//verificar se existe um id em localStorage, caso não exista, iremos setar
		let id = localStorage.getItem('id');

		if (id === null) {
			localStorage.setItem('id', 0);
		}
	}

	//checar se existe um id inserido em localstorage
	getProximoId() {
		//localStorage.getItem serve para recuperar um dado dentro de localStorage
		let proximoId = localStorage.getItem('id');
		return parseInt(proximoId) + 1;//converte pra inteiro e soma +1
	}

	//utilizada para gravar os dados vindos de despesa, dentro do Local Storage do navegador
	gravar(d) {
		//pega o id vindo de localStorage
		let id = localStorage.getItem('id')

		//condicional para verifical se o id é null ou não
		if(id === null) {
			id = 0;
		} else {
			//pega o próximo id
			id = this.getProximoId();
		}

		//acessar Local Storage || JSON.stringify() faz a conversão dos atributos para JSON
		localStorage.setItem(id, JSON.stringify(d));

		//atualizar o valor contido dentro da chave id, com a informação do novo id, produzido por getProximoId
		localStorage.setItem('id', id);
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = Array()

		let id = localStorage.getItem('id');

		//recuérar todas as despesas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {
			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i)); //JSON.parse() converte os JSONs em objetos

			//existe a possibilidade de haver índices que foram deletados. Iremos pular esses índices
			if(despesa === null) {
				/*o continue quando identficado pelo interpretador, dentro de uma estrutura de laço, 
				faz com que o laço avance para a interação seguinte, desconsiderando o que estive abaixo, 
				no caso, o que for identico a null. Portanto, retorna os válidos */
				continue; 
			}

			despesas.push(despesa);
		}

		return despesas;
	}

	//esse métdo recebe por parâmetro uma despesa
	pesquisar(despesa) {
		//declarando uma variável do tipo array
		let despesasFiltradas = Array();

		//recuoeramos todos os dados
		despesasFiltradas = this.recuperarTodosRegistros();

		
		console.log(despesa)
		console.log(despesasFiltradas);

		//ano
		if(despesa.ano != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
		}

		//mes
		if(despesa.mes != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
		}

		//dia
		if(despesa.dia != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
		}

		//tipo
		if(despesa.tipo != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
		}

		//descricao
		if(despesa.descricao != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
		}

		//valor
		if(despesa.valor != '') {
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
		}

		console.log(despesasFiltradas);
	}
}

//instanciação da classe Bd
let bd = new Bd();

function cadastrarDespesa() {

	//variáveis declaradas para referenciar IDs, vindos do HTML
	let ano = document.getElementById('ano');
	let mes = document.getElementById('mes');
	let dia = document.getElementById('dia');
	let tipo = document.getElementById('tipo');
	let descricao = document.getElementById('descricao');
	let valor = document.getElementById('valor');

	//instanciação da classe Despesa, passando o valor dos campos que declaramos acima
	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value
	);

	if(despesa.validarDados()) {
		//chama a função gravar, passando os dados da instância da classe Despesa
		bd.gravar(despesa);

		//alteração nas classes html do modal, a partir de IDs, para apresentar as cores e mensagem de sucesso
		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso !';
		document.getElementById('modal_titulo_div').className = 'modal-header text-success';
		document.getElementById('modal_conteudo').innerHTML = 'A despesa foi cadastrada com sucesso !';
		document.getElementById('modal_btn').className = 'btn btn-success';
		document.getElementById('modal_btn').innerHTML = 'Voltar';

		//dialog de sucesso na gravação da Despesa
		$('#modalRegistraDespesa').modal('show');

		//limpar os campos após cadastrar a despesa
		ano.value = '';
		mes.value = '';
		dia.value = '';
		tipo.value = '';
		descricao.value = '';
		valor.value = '';
	} else {
		//alteração nas classes html do modal, a partir de IDs, para apresentar as cores e mensagem de erro
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro !';
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
		document.getElementById('modal_conteudo').innerHTML = 'Verique se todos os campos foram preenchidos corretamente !';
		document.getElementById('modal_btn').className = 'btn btn-danger';
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';

		//dialog de erro caso tenha campos faltando
		$('#modalRegistraDespesa').modal('show');
	}	
}

function carregaListaDespesas() {

	let despesas = Array();

	despesas = bd.recuperarTodosRegistros();

	//selecionand o elemento tbody da tabela
	let listaDespesas = document.getElementById('listaDespesas');

	//percorrer o array despesas, listando cada despesa de forma dinâmica
	despesas.forEach(function(d) {
		
		//criando a linha (tr)
		let linha = listaDespesas.insertRow();

		//crias as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;

		//ajustar o tipo
		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
				break;
			case '2': d.tipo = 'Educação'
				break;
			case '3': d.tipo = 'Lazer'
				break;
			case '4': d.tipo = 'Saúde'
				break;
			case '5': d.tipo = 'Transporte'
				break;
		}
		linha.insertCell(1).innerHTML = d.tipo;
		linha.insertCell(2).innerHTML = d.descricao;
		linha.insertCell(3).innerHTML = d.valor;
	});
}

//recebe o valor dos campos preenchidos na página de consulta de despesas
function pesquisarDespesa() {
	let ano = document.getElementById('ano').value;
	let mes = document.getElementById('mes').value;
	let dia = document.getElementById('dia').value;
	let tipo = document.getElementById('tipo').value;
	let descricao = document.getElementById('descricao').value;
	let valor = document.getElementById('valor').value;

	//instanciação da classe despesa, recuperando o valor dos campos
	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

	//chamando o método pesquisar, criado na classe bd e passando para ele uma despesa, que nada mais é que os campos que serão filtrados
	bd.pesquisar(despesa)
}
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

		//dialog de sucesso na gravação da despesa
		$('#sucessoGravacao').modal('show');
	} else {
		//dialog de erro caso tenha campos faltando
		$('#erroGravacao').modal('show');
	}	
}
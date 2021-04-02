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
}

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

	//chama a função gravar, passando os dados da instância da classe Despesa
	gravar(despesa);
}

//utilizada para gravar os dados vindos de despesa, dentro do Local Storage do navegador
function gravar(d) {
	//acessar Local Storage || JSON.stringify() faz a conversão dos atributos para JSON
	localStorage.setItem('despesa', JSON.stringify(d));
}


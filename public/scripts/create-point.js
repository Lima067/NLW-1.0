 /*Formulário - Estados e Cidades*/
 //Função para obter os estados e preencher a lista de estados
 function populateUfs()
 {
     const ufSelect = document.querySelector("select[name=uf]")
     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     .then( res => res.json())
     .then( states => 
        {
            for(state of states)
            {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
 }
 
 //Chama a função de preenchimento de estados
populateUfs()

//Insere as cidades de acordo com o estado selecionado
function getCities(event)
{
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => 
       {
           for(city of cities)
           {
               citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
           }

           citySelect.disabled = false
       })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

/*Ítens de coleta*/
//Pegar todos os li`s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect)
{
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = []

function handleSelectedItem(event)
{
    const itemLi = event.target
    //Adicionar ou remover uma class com JS
    //.add = Adicionar
    //.remove = Remover
    //.toggle = Adicionar ou Remover
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    //console.log('ITEM ID:', itemId)

    //Verificar se existem itens selecionados, se sim
    //Pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( 
        item =>
        {
            const itemFound = item == itemId //Compara e armazena verdadeiro ou falso na variavel itemFound
            return itemFound
        })
    //Se já estiver selecionado,
    if(alreadySelected >= 0)
    {
        //remover da seleção
        const filteredItems = selectedItems.filter( 
            item => 
            {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            selectedItems = filteredItems
    }
    else
    {
        //Se não estiver selecionado, adiciona a seleção
        selectedItems.push(itemId)
    }
    
    //console.log('Itens Selecionado', selectedItems)
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}
import {List} from 'immutable';
// função redutora 'REDUCER'

export function timeline(state=[new List], action){
    if(action.type === 'LISTAGEM'){
      console.log("entrou na action LISTAGEM");
  
      return new List(action.fotos);
    }

    if(action.type === 'COMENTARIO'){
      // PEGO A FOTO ANTIGA
      const fotoAntiga = state.find(foto => foto.id === action.fotoId);        
      // LISTA DE COMENTARIO CONCATENADA COM O NOVO COMENTARIO
      const novosComentarios = fotoAntiga.comentarios.concat(action.novoComentario);
      // NOVA FOTO DA ATUALIZA SEM MEXER NO ESTADO DA FOTO ANTIGA
      const fotoAtualizada = Object.assign({}, fotoAntiga, {comentarios: novosComentarios});
      // NO ESTADO DO 'STORE', PEGO O INDICE DA FOTO QUE RECEBI COMO PARAMETRO, 
      const indice = state.findIndex(foto => foto.id === action.fotoId);
      // COM ESTE INDICE, ESTOU FAZENDO UM REPLACE. PASSANDO O INDICE QUE DEVE SER TROCADO E O NOVO OBJETO
      const novaLista = state.set(indice, fotoAtualizada);

      return novaLista;
    }

    if(action.type === 'LIKE'){
      const fotoAntiga = state.find(foto => foto.id === action.fotoId);
      const possivelLiker = fotoAntiga.likers.find(likerAtual => likerAtual.login === action.liker.login);
      const novoLikeada = !fotoAntiga.likeada;
      const novosLikers = {}
      
      if(possivelLiker === undefined)
        novosLikers = fotoAntiga.likers.concat(action.liker);
      else
        novosLikers = fotoAntiga.likers.filter(likerAtual => likerAtual.login !== action.liker.login);

      const fotoAtualizada = Object.assign({}, fotoAntiga, {likers: novosLikers}, {likeada: novoLikeada});
      const indice = state.findIndex(foto => foto.id === action.fotoId);
      const novaLista = state.set(indice, fotoAtualizada);
  
    return novaLista;
  }
}
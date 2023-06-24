import {
  SET_USER,
  FIND_PAQUETES,
  SET_PAQUETES,
  SET_USERS,
  FIND_USERS,
  FIND_CLASS,
  SET_CLASS,
  SET_PAGINA,
} from "../actions/actions";

const perPage = 8;

const initialState = {
  user: {},
  pagina: 1,
  paquetes: [],
  paquetesOrigin: [],
  users: [],
  usersOrigin: [],
  clases: [],
  clasesOrigin: [],
  maxPagesPacks: null,
  maxPagesUser:null,
  maxPagesClass: null,
};
const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    case SET_PAQUETES: {
      return {
        ...state,
        paquetes: payload.slice(
          (state.pagina - 1) * perPage,
          perPage * state.pagina
        ),
        paquetesOrigin: payload,
        maxPagesPacks: Math.ceil(payload.length/perPage)
      };
    }
    case SET_PAGINA: {
      return {
        ...state,
        pagina: payload,
        paquetes: state.paquetesOrigin.slice(
          (payload - 1) * perPage,
          perPage * payload
        ),
        clases: state.clasesOrigin.slice(
          (payload - 1) * perPage,
          perPage * payload
        ),
        users: state.usersOrigin.slice(
          (payload - 1) * perPage,
          perPage * payload
        ),
      };
    }
    case FIND_PAQUETES: {
      return {
        ...state,
        pagina: 1,
        paquetes: state.paquetesOrigin.filter((p) =>
          p.title.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        pagina:1,
        users: payload.slice(
          (state.pagina - 1) * perPage,
          perPage * state.pagina
        ),
        usersOrigin: payload,
        maxPagesUser: Math.ceil(payload.length/perPage)
      };
    }
    case FIND_USERS: {
      return {
        ...state,
        users: state.usersOrigin.filter((p) =>
          p.email.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    }
    case SET_CLASS: {
      return {
        ...state,
        pagina:1,
        clases: payload.slice(
          (state.pagina - 1) * perPage,
          perPage * state.pagina
        ),
        clasesOrigin: payload,
        maxPagesClass: Math.ceil(payload.length/perPage)
      };
    }
    case FIND_CLASS: {
      return {
        ...state,
        clases: state.clasesOrigin.filter((p) =>
          p.title.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    }
    default:
      return { ...state };
  }
};

export default rootReducer;

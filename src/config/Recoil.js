import { atom} from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key:'admin',
    storage:localStorage
})


export const adminState = atom({
    key:'adminState', //구분 되는 고유한 키
    default:{
        token:'',
        id:'',
        name:'',
        uid:'',
        is_root:'',
        login_at: '',
        create_at: '',
        update_at: '',
        delete_at: ''
    },  //기본 값,
    effects_UNSTABLE: [persistAtom]
})



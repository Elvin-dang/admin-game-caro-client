import axiosClient from './axiosClient';

const gameApi = {
    getAll:()=>{
        const url = `game/getAll`;
        return axiosClient.get(url);
    }
};
export default gameApi;
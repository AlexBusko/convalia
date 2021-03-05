
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "1145fd96-414c-40f2-afb5-dfd444da094d"},
});

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId: number) {
        console.warn('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId);
    }
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
}

export enum ResultCodeEnums  {
    Success = 0,
    Error = 1
}

type MyResponseType = {
    data: {
        id: number, 
        email:string, 
        login:string,
    };
    resultCode: ResultCodeEnums;
    messages: Array<string>
}

type LoginResponseType = {
    data: {id: number};
    resultCode: ResultCodeEnums;
    messages: Array<string>
}

export const authAPI = {
    me () {
        return instance.get<MyResponseType>(`auth/me`).then(res => res.data);
    },
    login (email: string, password: string, rememberMe = false ) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe }).then(res => res.data);
    },
    logout () {
        return instance.delete(`auth/login`);
    },
}

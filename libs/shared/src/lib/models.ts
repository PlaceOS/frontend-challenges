import { Enums } from './enums';
import { SharedConfig } from './shared.config';

export module Models{

    // Base user class
    class User{
        Username:string;
        Name:string;
        Type:Enums.UserType;
        constructor(data?:IUserEntity){
            if(data){
                this.Username   = data.Username;
                this.Name       = data.Name;
                this.Type       = data.Type;
            }
        }
    }

    // Represents a full view of a User and his/her todo tasks for frontend uses
    export class UserTodo extends User{
        Tasks:Array<Task>;

        constructor(data?:IUserEntity){
            super(data);
            if(data && data.Tasks){
                this.Tasks  = data.Tasks;
            }else{
                this.Tasks = new Array<Task>();
            }
        }
    }

    //Represents the active user's session token, e.g JWT Payload
    export class UserSession extends User{
        SessionExpiry:Date;

        constructor(data?:IUserEntity){
            super(data);
            this.SessionExpiry = new Date(Date.now() + SharedConfig.SESSION_EXPIRY_TIME); 
        }
    }

    //Represents a todo task 
    export class Task{
        Id:number;
        Status:Enums.TaskStatus;
        Description:string;

        constructor(){
            this.Id = Date.now();
            this.Status = Enums.TaskStatus.ACTIVE;
        }
    }
    
    //Only persistence layer should have access to sensitive data like password
    export interface IUserEntity extends User{
        Password:string;
        Tasks:Array<Task>;
    }

    export interface IEvent<T>{
        Name:Enums.EventName;
        Action?:IEventAction<T>
    }

    export interface IEventAction<T>{
        Username:string;
        Data?:T;
    }
}



export const _InitialData:Array<Models.IUserEntity> = [
    {Name:"Phillipa Eilhart",Username:"adminuser",Password:"pass123", Type:Enums.UserType.ADMIN, Tasks: [
        {Id:1001, Status:Enums.TaskStatus.ACTIVE, Description:"Shop for new megascope"},
        {Id:1002, Status:Enums.TaskStatus.ACTIVE, Description:"Find a new apprentice"}
    ]},
    {Name:"Francesca Findabair",Username:"normal01",Password:"pass123",Type:Enums.UserType.NORMAL, Tasks:[
        {Id:2001, Status:Enums.TaskStatus.ACTIVE, Description:"Shop for new megascope"},
        {Id:2002, Status:Enums.TaskStatus.ACTIVE, Description:"Find a new apprentice"}
    ]},
    {Name:"Margarita Laux-Antille",Username:"normal02",Password:"pass123",Type:Enums.UserType.NORMAL, Tasks:[]},
];

# Credintial_Express_DB_APP

# Role-Based Access Control (RBAC) system
This App is as Express API app with Database wich has user and profile tables and also permissions and roles tables and another two table to connect users with roles and table to connect permisions to roles

## To Run the App :
if you want to run the API app   
1- clone the reapo   
2- then in the command prompt in the root folder run command (you should have node installed) :     
**npm i**  
3- then run in the terminal:  
**npm run dev**  

# To test the App:
you need postman to run and test the following API endpoints:

1- Get Users with roles and there permisssions:

method: get   
  
  localhost:3000/v1/user  

2- Create A User:

method: post   
  
  localhost:3000/v1/user 
    
**payload/input raw as json:**
```
{
"username":"ahmad",
"password":"1234",
"email":"ahmad.m.a@outlook.com"
}
```

3- create permission:  
method: post
  
localhost:3000/v1/admin/permission

**payload/input raw as json:**
```
{
    "name":"create"
}
```

4- create role:  
method: post
  
localhost:3000/v1/admin/role

**payload/input raw as json:**
```
{
    "name":"admin",
    "permissions":[1,2,3]
}
```
5- assing role to user:  
method: post
  
localhost:3000/v1/admin/assignrole

**payload/input raw as json:**
```
{
    "id":1,
    "roles":[1,2]
}
```
6- create profile  
localhost:3000/v1/user/profile

**payload/input raw as json:**
```
{
    "id":1,
    "firstName": "Mohamed",
    "lastName": "Ahmed",
    "dateOfBirth": "1/1/2022"
}
```

7- login
    
localhost:3000/v1/user/login

**also the other payload/input is raw as json:**
```
{
    "id":1,
    "firstName": "Mohamed",
    "lastName": "Ahmed",
    "dateOfBirth": "1/1/2022"
}
```
  
**output is the token value.**
  ___

8- verify token :  
   
localhost:3000/v1/user/verify

**input or payload is:**  
```
{
  "token":"value of token"
}
```
  
**output:**
```
{
    "token":ture,
    'msg':'The token is right'
}
```  
  or:  
```
{
    "token":false,
    'msg':'The token is wrong'
}
```
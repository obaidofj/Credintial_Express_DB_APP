# Credintial_Express_DB_APP

# Role-Based Access Control (RBAC) system
This App is as Express API app with Database wich has user and profile tables and also permissions and roles tables and another two table to connect users with roles and table to connect permisions to roles

## To Run the App :
if you want to run the API app   
1- clone the reapo   
2- then in the command prompt in the root folder run command :     run npm i  

# To test the App:
you need postman to run and test the following API endpoints:

1- Get Users with roles and there permisssions:

method: get   
  
  localhost:3000/v1/users  


2- create permission:  
method: post
  
localhost:3000/v1/admin/permission

**payload/input raw as json:**
```
{
    "name":"create"
}
```

3- create role:  
method: post
  
localhost:3000/v1/admin/role

**payload/input raw as json:**
```
{
    "name":"admin",
    "permissions":[1,2,3]
}
```
4- assing role to user:  
method: post
  
localhost:3000/v1/admin/assignrole

**payload/input raw as json:**
```
{
    "id":1,
    "roles":[1,2]
}
```
5- create profile  
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
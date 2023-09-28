# Umrah

# Documentation

**BASE URL = http://localhost:5002**

## Auth

#### Refresh Token

```bash
/auth/refresh_token
```

**Method : GET**
### Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Login

```bash
/auth/login
```

**Method : POST**

### Body

|   Name    |  Status  |  Type  |
| :-------: | :------: | :----: |
| telephone | Required | String |
| password  | Required | String |

#### Register

```bash
/auth/register
```

**Method : POST**

### Body

|     Name      |  Status  |  type   |
| :-----------: | :------: | :-----: |
|   username    | Required | Integer |
|   telephone   | Required | String  |
|   password    | Required | String  |
| jenis_kelamin | Required | Integer |

#### List (Admin only)

```bash
/user
```

**Method : GET**

Params

| Name  |  Status  |  tyoe   |                   description                   |
| :---: | :------: | :-----: | :---------------------------------------------: |
| page  | Optional | Integer |                                                 |
| limit | Optional | Integer |                                                 |
|  key  | Optional | String  | Search by username, telephone and jenis_kelamin |

#### Detail

```bash
/user/[slug]
```

**Method : GET**

### Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit

```bash
/user/edit-profile/[slug]
```

**Method : PUT**

### Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

### Body

|     Name      |  Status  |         |
| :-----------: | :------: | :-----: |
|     nama      | Optional | String  |
|   username    | required | Integer |
|     email     | Optional | Integer |
|   telephone   | Required | String  |
| tempat_lahir  | Required | String  |
| tanggal_lahir | Required | String  |

## Admin

#### Login

```bash
/admin/login
```

**Method : POST**

### Body

|   Name   |  Status  |        |
| :------: | :------: | :----: |
|  email   | Required | String |
| password | Required | String |

#### Register (Only administrator)

```bash
/admin/register
```

Note : **Admin is added by administrator** <br/>
**Method : POST**

### Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
| username | Required | String  |
|  email   | Required | String  |
| password | Required | String  |
| id_role  | Required | Integer |

### Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List (Only admin)

```bash
/admin
```

**Method : GET**

Params

| Name  |  Status  |         |                 |
| :---: | :------: | :-----: | :-------------: |
| page  | Optional | Integer |                 |
| limit | Optional | Integer |                 |
|  key  | Optional | String  | Search by email |

### Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Artikel

```bash
/artikel/create
```

**Method : POST**

### Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
|    title    | Required | String |
| description | Required | String |
| file_create | Required |  File  |

### Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Edit (Admin only)

```bash
/artikel/edit/[slug]
```

**Method : PUT**

### Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
|    tilte    | Optional | String |
| description | Optional | String |
| file_update | Optional |  File  |

### Headers

|    name     |  Status  |        type         |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Delete (Admin only)

```bash
/artikel/delete/[slug]
```

**Method : DELETE**
### Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```bash
/artikel
```

**Method : GET**

Params

| Name  |  Status  |        type         |   description   |
| :---: | :------: | :-----------------: | :-------------: |
| page  | Optional |       Integer       |                 |
| limit | Optional |       Integer       |                 |
|  key  | Optional |       String        | Search by judul |

#### Detail

```bash
/artikel/[slug]
```

**Method : GET**

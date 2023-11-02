<h1 align="center">
-- UMROH --
</h1>

<p align="center">
Contributors:
</p>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/larsalfarabi">
        <img src="https://avatars.githubusercontent.com/u/95275882?v=4" width="100px;" alt="larsalfarabi"/>
      </a>
      <br />
      <a href="https://github.com/larsalfarabi">larsalfarabi</a>
    </td>
    <td align="center">
      <a href="https://github.com/Sunflwr15">
        <img src="https://avatars.githubusercontent.com/u/95333556?v=4" width="100px;" alt="Sunflwr15"/>
      </a>
      <br />
      <a href="https://github.com/Sunflwr15">Sunflwr15</a>
    </td>
    <td align="center">
      <a href="https://github.com/Wakype">
        <img src="https://avatars.githubusercontent.com/u/94674924?v=4" width="100px;" alt="Wakype"/>
      </a>
      <br />
      <a href="https://github.com/wizardforcel">Wakype</a>
    </td>
    <td align="center">
      <a href="https://github.com/muhansyah">
        <img src="https://avatars.githubusercontent.com/u/95397172?v=4" width="100px;" alt="muhansyah"/>
      </a>
      <br />
      <a href="https://github.com/wizardforcel">muhansyah</a>
    </td>
  </tr>
</table>
<br/><br/><br/><br/><br/>

# Usage

1. Clone this repository

```markdown
https://github.com/SMKMADINATULQURAN-PROJECT-2023/BE-Kelompok-Umroh.git
```

2. run `npm install`

3. run `npm run start:dev`

# Documentation

`BASE URL = http://localhost:5002`

## Auth

#### Login

```markdown
/auth/login
```

**Method : POST**

Body

|   Name    |  Status  |  Type  |
| :-------: | :------: | :----: |
| telephone | Required | String |
| password  | Required | String |

#### Google Login

```markdown
/auth/google-login
```

**Method : POST**

Body

| Name  |  Status  |  Type  |
| :---: | :------: | :----: |
| email | Required | String |

#### Register

```markdown
/auth/register
```

**Method : POST**

Body

|     Name      |  Status  |           type           |
| :-----------: | :------: | :----------------------: |
|   username    | Required |          String          |
|   telephone   | Required |          String          |
|   password    | Required |          String          |
| jenis_kelamin | Required | "Laki-Laki", "Perempuan" |

#### Admin Profile

```markdown
/auth/admin-profile
```

**Method : Get**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Admin Update Profile

```markdown
/auth/update-profile-admin
```

**Method : PUT**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|     Name      |  Status  |                          |
| :-----------: | :------: | :----------------------: |
|   username    | required |          String          |
|     email     | Optional |          String          |
|   telephone   | Required |          String          |
| tempat_lahir  | Required |          String          |
| tanggal_lahir | Required |           Date           |
| jenis_kelamin | Required | "Laki-Laki", "Perempuan" |

#### User Profile

```markdown
/auth/profile
```

**Method : Get**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### User Update Profile

```markdown
/auth/update-profile
```

**Method : PUT**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|     Name      |  Status  |                          |
| :-----------: | :------: | :----------------------: |
|   username    | required |          String          |
|     email     | Optional |          String          |
|   telephone   | Required |          String          |
| tempat_lahir  | Required |          String          |
| tanggal_lahir | Required |           Date           |
| jenis_kelamin | Required | "Laki-Laki", "Perempuan" |

#### User Update Password

```markdown
/auth/update-password
```

**Method : PUT**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| refresh_token | required | String |
| new_password  | Optional | String |

## User

#### List (Admin only)

```markdown
/user
```

**Method : GET**

Params

|   Name   |  Status  |  tyoe   |                   description                   |
| :------: | :------: | :-----: | :---------------------------------------------: |
|   page   | Optional | Integer |                                                 |
| pageSize | Optional | Integer |                                                 |
| keyword  | Optional | String  | Search by username, telephone and jenis_kelamin |

#### Detail

```markdown
/user/[id]
```

**Method : GET**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Refresh Token

```markdown
/user/refresh-token
```

**Method : Post**

Body

|     Name      |  Status  |  Type   |
| :-----------: | :------: | :-----: |
|      id       | Required | integer |
| refresh_token | Required | String  |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Admin

#### Login

```markdown
/admin/login
```

**Method : POST**

Body

|   Name   |  Status  |        |
| :------: | :------: | :----: |
|  email   | Required | String |
| password | Required | String |

#### Register (Only administrator)

```markdown
/admin/create
```

Note : **Admin is added by administrator** <br/>
**Method : POST**

Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
| username | Required | String  |
|  email   | Required | String  |
| password | Required | String  |
| role_id  | Required | integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List (Only admin)

```markdown
/admin
```

**Method : GET**

Params

|   Name   |  Status  |         |                 |
| :------: | :------: | :-----: | :-------------: |
|   page   | Optional | Integer |                 |
| pageSize | Optional | Integer |                 |
| keyword  | Optional | String  | Search by email |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Refresh Token

```markdown
/admin/refresh-token
```

**Method : Post**

Body

|     Name      |  Status  |  Type   |
| :-----------: | :------: | :-----: |
|      id       | Required | integer |
| refresh_token | Required | String  |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Artikel

#### Create

```markdown
/artikel/create
```

**Method : POST**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
|    title    | Required | String |
| description | Required | String |
| file_create | Required |  File  |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### update (Admin only)

```markdown
/artikel/update/[id]
```

**Method : PUT**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
|    tilte    | Optional | String |
| description | Optional | String |
| file_update | Optional |  File  |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Delete (Admin only)

```markdown
/artikel/delete/[id]
```

**Method : DELETE**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/artikel
```

**Method : GET**

Params

|   Name   |  Status  |         |                 |
| :------: | :------: | :-----: | :-------------: |
|   page   | Optional | Integer |                 |
| pageSize | Optional | Integer |                 |
| keyword  | Optional | String  | Search by judul |

#### Detail

```markdown
/artikel/[id]
```

**Method : GET**

## Doa

#### Create (Admin only)

```markdown
/doa/create
```

**Method : POST**

Body

|    Name     |  Status  |         |
| :---------: | :------: | :-----: |
|    name     | Required | String  |
|    arab     | Required | String  |
|    latin    | Required | String  |
|    arti     | Required | String  |
| katigori_id | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### update (Admin only)

```markdown
/doa/update/[id]
```

**Method : PUT**

Body

|    Name     |  Status  |         |
| :---------: | :------: | :-----: |
|    name     | Required | String  |
|    arab     | Required | String  |
|    latin    | Required | String  |
|    arti     | Required | String  |
| katigori_id | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/doa/delete/[id]
```

**Method : DELETE**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/doa
```

**Method : GET**

Params

|   Name   |  Status  |         |                |
| :------: | :------: | :-----: | :------------: |
|   page   | Optional | Integer |                |
| pageSize | Optional | Integer |                |
| keyword  | Optional | String  | Search by name |

#### Detail

```markdown
/doa/[id]
```

**Method : GET**

## Kategori Doa

#### Create (Admin only)

```markdown
/doa/kategori/create
```

**Method : POST**

Body

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
|  file_create  | Required |  File  |
| kategori_name | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### update (Admin only)

```markdown
/doa/kategori/update/[id]
```

**Method : PUT**

Body

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
|  file_update  | Required |  File  |
| kategori_name | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/doa/kategori/delete/[id]
```

**Method : DELETE**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/doa/kategori
```

**Method : GET**

Params

|   Name   |  Status  |         |                         |
| :------: | :------: | :-----: | :---------------------: |
|   page   | Optional | Integer |                         |
| pageSize | Optional | Integer |                         |
| keyword  | Optional | String  | Search by kategori_name |

#### Detail

```markdown
/doa/kategori/[id]
```

**Method : GET**

## Dzikir Pagi

#### List

```markdown
/dzikir/pagi
```

**Method : GET**

Params

|   Name   |  Status  |         |     |
| :------: | :------: | :-----: | :-: |
|   page   | Optional | Integer |     |
| pageSize | Optional | Integer |     |

## Dzikir Petang

#### List

```markdown
/dzikir/petang
```

**Method : GET**

Params

|   Name   |  Status  |         |     |
| :------: | :------: | :-----: | :-: |
|   page   | Optional | Integer |     |
| pageSize | Optional | Integer |     |

## Lokasi Ziarah

#### Create (Admin only)

```markdown
/lokasi_ziarah/create
```

**Method : POST**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
| file_create | Required |  File  |
|    name     | Required |  File  |
|  lacation   | Required | String |
| description | Required | String |
|  latitude   | Required | String |
|  longitude  | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### update (Admin only)

```markdown
/lokasi_ziarah/update/[id]
```

**Method : PUT**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
| file_create | Required |  File  |
|    name     | Required |  File  |
|  lacation   | Required | String |
| description | Required | String |
|  latitude   | Required | String |
|  longitude  | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/lokasi_ziarah/delete/[id]
```

**Method : DELETE**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/lokasi_ziarah
```

**Method : GET**

Params

|   Name   |  Status  |         |                         |
| :------: | :------: | :-----: | :---------------------: |
|   page   | Optional | Integer |                         |
| pageSize | Optional | Integer |                         |
| keyword  | Optional | String  | Search by kategori_name |

#### Detail

```markdown
/lokasi_ziarah/[id]
```

**Method : GET**

## Panduan

#### Create (Admin only)

```markdown
/panduan/create
```

**Method : POST**

Body

|       Name       |  Status  |                             |
| :--------------: | :------: | :-------------------------: |
|       url        | Required |           String            |
|      title       | Required |           String            |
|   description    | Required |           String            |
|      gender      | Required | "Laki-Laki" dan "Perempuan" |
| kategori_panduan | Required |     "Haji" dan "Umrah"      |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### update (Admin only)

```markdown
/panduan/update/[id]
```

**Method : PUT**

Body

|       Name       |  Status  |                             |
| :--------------: | :------: | :-------------------------: |
|       url        | Required |           String            |
|      title       | Required |           String            |
|   description    | Required |           String            |
|      gender      | Required | "Laki-Laki" dan "Perempuan" |
| kategori_panduan | Required |     "Haji" dan "Umrah"      |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/panduan/delete/[id]
```

**Method : DELETE**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/panduan
```

**Method : GET**

Params

|       Name       |  Status  |         |                                       |
| :--------------: | :------: | :-----: | :-----------------------------------: |
|       page       | Optional | Integer |                                       |
|     pageSize     | Optional | Integer |                                       |
| kategori_panduan | Optional | String  |     Search by "Haji" dan "Umrah"      |
|      gender      | Optional | String  | Search by "Laki-Laki" dan "Perempuan" |

#### Detail

```markdown
/panduan/[id]
```

**Method : GET**

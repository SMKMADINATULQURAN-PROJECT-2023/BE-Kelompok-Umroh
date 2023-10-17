# Umrah

# Usage

1. Clone this repository

```markdown
https://github.com/Al-Ghozy03/kecamatan-jonggol.git
```

2. run `npm install`

3. run `npm run dev:start`

# Usage

1. Clone this repository

```markdown
https://github.com/Al-Ghozy03/kecamatan-jonggol.git
```

2. run `npm install`

3. run `npm run dev:start`

# Documentation

**BASE URL = http://localhost:5002**

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

|    Name     |  Status  |                             |
| :---------: | :------: | :-------------------------: |
|     url     | Required |           String            |
|    title    | Required |           String            |
| description | Required |           String            |
|  kategori   | Required | "Laki-Laki" dan "Perempuan" |

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

|    Name     |  Status  |                             |
| :---------: | :------: | :-------------------------: |
|     url     | Required |           String            |
|    title    | Required |           String            |
| description | Required |           String            |
|  kategori   | Required | "Laki-Laki" dan "Perempuan" |

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

|   Name   |  Status  |         |                                       |
| :------: | :------: | :-----: | :-----------------------------------: |
|   page   | Optional | Integer |                                       |
| pageSize | Optional | Integer |                                       |
| kategori | Optional | String  | Search by "Laki-Laki" dan "Perempuan" |

#### Detail

```markdown
/panduan/[id]
```

**Method : GET**

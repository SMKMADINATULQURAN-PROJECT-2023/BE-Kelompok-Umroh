# Umrah

# Documentation

**BASE URL = http://localhost:5002**

## Auth

#### Refresh Token

```markdown
/auth/refresh_token
```

**Method : GET**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

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
/user/[slug]
```

**Method : GET**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit

```markdown
/user/edit-profile/[slug]
```

**Method : PUT**

Headers

|     Name      |  Status  |  type  |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|     Name      |  Status  |                          |
| :-----------: | :------: | :----------------------: |
|     nama      | Optional |          String          |
|   username    | required |          String          |
|     email     | Optional |          String          |
|   telephone   | Required |          String          |
| tempat_lahir  | Required |          String          |
| tanggal_lahir | Required |           Date           |
| jenis_kelamin | Required | "Laki-Laki", "Perempuan" |

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
/admin/register
```

Note : **Admin is added by administrator** <br/>
**Method : POST**

Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
| username | Required | String  |
|  email   | Required | String  |
| password | Required | String  |
| id_role  | Required | Integer |

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

## Artikel

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

#### Edit (Admin only)

```markdown
/artikel/edit/[slug]
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
/artikel/delete/[slug]
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
/artikel/[slug]
```

**Method : GET**

## Doa

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

#### Edit (Admin only)

```markdown
/doa/edit/[slug]
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
/doa/delete/[slug]
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
/doa/[slug]
```

**Method : GET**

## Kategori Doa

```markdown
/doa/kategori/create
```

**Method : POST**

Body

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| kategori_name | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/doa/kategori/edit/[slug]
```

**Method : PUT**

Body

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| kategori_name | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/doa/kategori/delete/[slug]
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
/doa/kategori/[slug]
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

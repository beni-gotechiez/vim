
# User Preferences API

## Description
This API allows you to manage user preferences and send notifications based on those preferences.

---

## **Run Services with Docker Compose**

### Start the Services
```bash
docker-compose up --build
```

### Access the Services
- **User Preferences API**: Accessible on port `8080`.
- **Notification Service**: Accessible on port `5001`.

---

## **Stop Services**

### Shut Down the Services
```bash
docker-compose down
```

---

## **Endpoints**

### **Create User Preferences**
**Endpoint**:  
`POST http://localhost:8080/preferences`

**Body**:  
```json
{
  "email": "newuser@example.com",
  "telephone": "+123456789",
  "preferences": { "email": true, "sms": true }
}
```

**Curl Example**:
```bash
curl -X POST http://localhost:8080/preferences   -H "Content-Type: application/json"   -d '{
    "email": "newuser@example.com",
    "telephone": "+123456789",
    "preferences": { "email": true, "sms": true }
  }'
```

### **Update User Preferences**
**Endpoint**:  
`PUT http://localhost:8080/preferences`

**Body**:  
```json
{
  "telephone": "+123456789",
  "preferences": { "email": false, "sms": true }
}
```

**Curl Example**:
```bash
curl -X PUT http://localhost:8080/preferences   -H "Content-Type: application/json"   -d '{
    "telephone": "+123456789",
    "preferences": { "email": false, "sms": true }
  }'
```

### **Send Notification**
**Endpoint**:  
`POST http://localhost:8080/preferences/send-notification`

**Body**:  
```json
{
  "userId": 1,
  "message": "Hello, this is a notification!"
}
```

**Curl Example**:
```bash
curl -X POST http://localhost:8080/preferences/send-notification   -H "Content-Type: application/json"   -d '{
    "userId": 1,
    "message": "Hello, this is a notification!"
  }'
```

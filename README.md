# Row Leg 腿排

Row Leg 是一個代排服務與人力媒合的網站 🧍🧍‍♂️🚶‍♀️

如果你受夠頂著大太陽、翻著白眼站在無止盡的人潮隊伍中，<br>
如果你沒事做、宅在家裡發呆、滑手遊，
這將是一個可以改變無趣日常的網站。


## 主功能介紹

- 會員系統與第三方登入整合，還可上傳喜歡的照片作為頭貼。
- 串接 [NewebPay 藍新金流](https://www.newebpay.com/) 作為線上支付工具。
- 使用 Rails 內建 [Action Mailer](https://guides.rubyonrails.org/action_mailer_basics.html) 收發信件，確立雙方任務達成協議。
- 串接 [Google Map](https://developers.google.com/maps/documentation) 讓腿腿們回報當前定位，還可以選擇交通方式計算時間。
- 應用 [Action Cable](https://guides.rubyonrails.org/action_cable_overview.html) 建立即時聊天室。
- 腿腿掃描 [QRcode](https://github.com/davidshimjs/qrcodejs) 回報任務完成，輕鬆交接。

## 畫面呈現

### 首頁
![homepage](https://user-images.githubusercontent.com/77479612/123286252-56740780-d540-11eb-906d-2e7341f5fb1f.png)

### 登入頁
![image](https://user-images.githubusercontent.com/77479612/123292427-9d183080-d545-11eb-9925-d698a0dc479e.png)

### 任務首頁
![image](https://user-images.githubusercontent.com/77479612/123287378-490b4d00-d541-11eb-979c-ae9c831f91e0.png)

### 藍新金流付款
![0624雇主付款](https://user-images.githubusercontent.com/77479612/123293601-b79ed980-d546-11eb-8fa6-8918b46e1280.gif)

### 信件發送
![image](https://user-images.githubusercontent.com/77479612/123294492-7955ea00-d547-11eb-8cfb-d5091db1d5d7.png)

### 任務頁-您接下的任務
![image](https://user-images.githubusercontent.com/77479612/123286854-d9955d80-d540-11eb-9369-700a01340540.png)

### 任務詳情頁
![image](https://user-images.githubusercontent.com/77479612/123287746-8d96e880-d541-11eb-9139-8f45a46a4119.png)

### 腿腿的定位回報功能
![image](https://user-images.githubusercontent.com/77479612/123288969-9a680c00-d542-11eb-87d6-eaaa7da1f7d8.png)

### 聊天室首頁
![image](https://user-images.githubusercontent.com/77479612/123288355-131a9880-d542-11eb-8923-c75c802aee30.png)

### 聊天視窗
![image](https://user-images.githubusercontent.com/77479612/123290270-b3bd8800-d543-11eb-8d4a-e3e8fdb18d1b.png)

### QR code
![image](https://user-images.githubusercontent.com/77479612/123287903-b0c19800-d541-11eb-85d5-c7bba6d00ef8.png)

### 交接畫面
![image](https://user-images.githubusercontent.com/77479612/123291667-e5831e80-d544-11eb-9d96-2b5f1a68bd6c.png)
![image](https://user-images.githubusercontent.com/77479612/123292241-70641900-d545-11eb-8df6-c320baa9db96.png)


## 安裝流程

```
$ git clone 此專案
$ cd 到此專案的資料夾
$ bundle install
$ yarn install
$ 啟動 postgresql
$ rails db:migrate
$ foreman s -f Procfile.dev
```

## 使用技術

- Ruby 版本：2.7.3
- Rails 版本：6.1.3.2
- 前端：Tailwind CSS / JavaScript / Stimulus
- 後端：Ruby on Rails / Redis
- 部署：Heroku
- 資料庫：PostgreSQL
- 版本控制與專案管理：Git / GitHub
- 第三方登入：Google / GitHub
- API 串接：藍新金流 / Google Map / Amazon S3
- 其他技術：Action Cable / QRcode

## 團隊成員

- [nauosika](https://github.com/nauosika)
- [YCChen_Victor](https://github.com/YCChenVictor)
- [hsufenglin](https://github.com/hsufenglin)
- [yuRicky09](https://github.com/yuRicky09)
- [NoelHsiao](https://github.com/huihsinhsiao)

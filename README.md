# Row Leg 腿排

Row Leg 是一個代排媒合網站 🧍

如果你受夠頂著大太陽、翻著白眼站在無止盡的人潮隊伍中，
如果你沒事做、宅在家裡發呆、滑手遊，
這將是一個可以改變無趣日常的網站。

網站連結：https://www.rowleg.online

## 功能介紹

- 會員系統與第三方登入整合，還可上傳喜歡的照片作為頭貼。
- 串接 [NewebPay 藍星金流](https://www.newebpay.com/) 作為線上支付工具。
- 使用 Rails 內建 [Action Mailer](https://guides.rubyonrails.org/action_mailer_basics.html) 收發信件，確立雙方任務達成協議。
- 串接 [Google Map](https://developers.google.com/maps/documentation) 讓腿腿們回報當前定位，還可以選擇交通方式計算時間。
- 應用 [Action Cable](https://guides.rubyonrails.org/action_cable_overview.html) 建立即時聊天室。
- 腿腿掃描 [QRcode](https://github.com/davidshimjs/qrcodejs) 回報任務完成，輕鬆交接。

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

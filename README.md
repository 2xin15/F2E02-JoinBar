### JoinBar 專案

🗺️ 🥂JoinBar 是一個酒吧社交地圖平台，整合了酒吧地圖、發起酒吧相關娛樂活動，亦可對活動留下評論，提供用戶搜尋酒吧、舉辦或參與活動、將官方活動加入購物車並購買、留下或觀看活動評論等功能。

---
### 使用套件

前端
- Vue.js
- Pinia
- Tailwind CSS（搭配 DaisyUI）

後端
- Express.js
- PostgreSQL

---

### 團體專案協作流程

1. 使用 GitHub 加入專案
```
- 開啟 GitHub 專案頁面
- 點選「Fork」或由管理員邀請加入 Collaborators
- 點選「Code」> 複製 HTTPS/SSH 連結
- 使用 git clone 指令下載專案
  git clone <repo-url> 例如：git clone https://github.com/2xin15/F2E02-JoinBar.git 
```


2. 開票（issue）
```
- 到 GitHub 專案頁面
- 點選「Issues」>「New Issue」
- 填寫標題與說明（可加上 labels）
- 按「Submit new issue」
```

3. 組員取票
```
在 issue 中留言這張票要做的事，並由管理員指派你，或自行 assign
```

4. 確認目前專案資料夾中檔案為最新檔案
```
在專案目錄執行：`git pull origin main`
```

5. 建立功能分支
```
git checkout -b issue/號碼
例如：git checkout -b issue/1
```

6. 開始開發並 commit
```
git add 檔案名稱
git commit -m "feat: 加入登入頁面"
```
7. push 到遠端
```
git push origin issue/號碼
例如：git push origin issue/1
```

8. 發 Pull Request 並 Code Review
```
- 到 GitHub 專案頁面
- 點選「Pull Requests」>「New pull request」
- 選擇 base 為 `dev`分支（開發階段都是選 dev 分支），compare 為你剛 push 的分支
- 填寫說明並送出
- 等待他人 Review
```

9. 合併（Merge）
```
Merge：(若需整合最新 main)
git checkout feature/your-feature-name
git fetch
git rebase origin/main
若有衝突需解決後繼續：git add . → git rebase --continue
```
---
### 組員分工
```


```

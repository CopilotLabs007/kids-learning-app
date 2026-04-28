# Lab 4 - VS Code Permissions and Autopilot in Copilot Chat 🚀🤖⚡

## Goal 🎯
Explain the practical difference between `Default Approvals` 🛑, `Bypass Approvals` ⚙️, and `Autopilot (Preview)` 🤖⚡ in Copilot Chat 💬.

## Straight-To-The-Point Summary ⚡
- `Default Approvals` 🛑: safest 🔒, but high friction 🧱 (many approval popups 🙋).
- `Bypass Approvals` ⚙️: removes approval popups ✅, but still stops when the agent needs a decision ✋.
- `Autopilot (Preview)` 🤖: removes approval popups ✅ and keeps moving 🔄 by auto-answering blocking questions 🧠 when possible.

In simple tasks 🧩, `Bypass` and `Autopilot` may look similar 👀.
In ambiguous tasks 🌫️, `Autopilot` is the one that keeps driving to completion 🏁.

## Quick Comparison Table 📊

A summary of the above:

| Permission Level | Security Dialogs | Ambiguity Handling | Completion Style |
| --- | --- | --- | --- |
| Default Approvals | Required for every step | Stops for user input | Manual supervision |
| Bypass Approvals | Automatically approved | Stops for user input | Semi-autonomous |
| Autopilot (Preview) | Automatically approved | Auto-responds to questions | Fully autonomous |

## Demo-Friendly Scenario 🎬
Use a multi-step prompt 🧠 (fetch data 🌐, write file 📝, run terminal checks 💻).

Expected behaviour 🔍:
- In `Default` 🛑: frequent approval interruptions ⛔.
- In `Bypass` ⚙️: fewer interruptions, but pauses at decision points ✋.
- In `Autopilot` 🤖: fewer pauses, continues to completion more often 🏁.

## Screenshots (For Demo) 📸🖼️
Use these visuals during the walkthrough 🧭:

### 1) Permissions Picker in Copilot Chat 🎚️💬
![Permissions Picker](https://visualstudiomagazine.com/articles/2026/03/12/~/media/ECG/visualstudiomagazine/Images/2026/03/approvals_dropdown.ashx)

### 2) Autopilot Enable Warning Dialog ⚠️🤖
![Enable Autopilot Warning](https://visualstudiomagazine.com/articles/2026/03/12/~/media/ECG/visualstudiomagazine/Images/2026/03/enable_autopilot.ashx)

### 3) Default Mode Friction (Repeated Allow Prompts) 🛑🙋
![Default Approvals Friction](https://visualstudiomagazine.com/articles/2026/03/12/~/media/ECG/visualstudiomagazine/Images/2026/03/default_approval_qa_2nd.ashx)

### 4) Bypass Pauses on User Decision ⚙️✋
![Bypass Asks Which Repo](https://visualstudiomagazine.com/articles/2026/03/12/~/media/ECG/visualstudiomagazine/Images/2026/03/which_one2.ashx)

### 5) Autopilot Continues and Decides 🤖✅
![Autopilot Continues](https://visualstudiomagazine.com/articles/2026/03/12/~/media/ECG/visualstudiomagazine/Images/2026/03/which_one.ashx)

## Key Message for Audience 🗣️✨
`Bypass` is mainly "approve tools automatically" ⚙️✅.
`Autopilot` is "approve tools + continue work through blockers" 🤖🔁.

## Important Safety Note 🔐⚠️
`Bypass` and `Autopilot` can run potentially destructive actions 💥 without manual approval.
Use them only in trusted environments 🛡️ and with clear task boundaries 📏.

## Enablement Note 🧩
Autopilot is preview-gated 🚧 and needs the setting ⚙️:
- `chat.autopilot.enabled`


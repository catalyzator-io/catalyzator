# Developer Prompts

This folder contains the unified prompts used by the developer when using LLMs to develop the code.

Those prompts are crucial for the quality and consistency of the code.

Those prompts are written in the [Markdown Prompt Format](https://platform.openai.com/docs/guides/markdown) and are used in the flow.

## Project Flow Highlights

- write a PRD for the project.
- improve the PRD's structure and clarity with the LLM.
- write the FRDs for the project based on the PRD.
- improve the FRDs' structure and clarity with the LLM.
- develop the project.
- while developing, reiterate the PRD and FRDs to ensure the project is on the right track.
- when advancing or pivoting, update the PRD and FRDs accordingly.

## App Description

The app description is the basic need for all the prompts. we use it for the PRD and FRDs.

Below is the app description for the current project.

```app-project:description

# Catalizator.io.

Catalyzator is transforming the landscape of innovation funding by creating an AI-driven Pitch-to-Grant that replaces complex, rigid application processes with an intuitive, conversational experience.

Founded in Tel Aviv, we envisioned a future where funding is streamlined, transparent, and tailored to innovation's dynamic nature. Our system intelligently matches startups to optimal funding pathways, equips venture funds and accelerators with real-time market insights, and empowers grant programs to evolve as proactive catalysts for change.

Built on a sophisticated AI architecture, Catalyzator doesn't just process applications—it recognizes narratives, maps the DNA of successful ventures, and provides actionable insights for both funders and founders.

Today, we're focused on simplifying grants; tomorrow, we'll connect all forms of innovation funding, from grants and venture capital to impact investments, ensuring every transformative idea finds the resources to thrive.

---

Some of our messages that shows our tone as a company:
- For Founders, by Founders. Tools to Take You from Zero to Launch.
- Skip The Forms. Just Talk with Catalyzator.
- Connecting Startups to Catalysts. Find the Right Funding, Instantly.
- Fund Your Venture Effortlessly Through AI. Powerful tools to accelerate your success.
- Catalyze Your Catalyzator. Streamline your operations with advanced tools.

---

**we put a huge focus on the user experience! the usage is voice chat based, and mobile-first. Hence, the app is designed to be simple, intuitive, and easy to use!!!**

**The AI might ask the user for additional information that was not provided in the initial pitch. This is to ensure the application is complete and accurate.**

---

## Our Products

### For Ventures (and Founders)

- Pitch-to-Grant: From Voice to Grant Application. Let AI transform your spoken story into winning grant applications.

- Navigator: recommend the best funding path for your startup. finds relevant grants, accelerators, and VCs for your startup.

- LaunchSuite: Complete startup toolkit from pitch to documentation. we help you prepare for your pitch, build your story, and create your client and investors files (e.g. one pagers).

- MarketRadar: Real-time market intelligence and analysis. we help you understand the market and the competition.

### For Catalysts (Grant Programs, accelerators, and VCs)

- CatalyzatorOS: Streamline your entire workflow. manage the full funding lifecycle, from deal flow to portfolio management. manage the applications, track the progress, and analyze the data.

- ImpactView: Track portfolio performance in real-time. analyze the impact of your portfolio and create the impact reports.

- GrantMatch: Connect with promising ventures instantly. find the right startups for your grant program, accelerator, or VC.

- InsightsConnect: Data-driven decision making tools. analyze the data and make data-driven decisions.
```
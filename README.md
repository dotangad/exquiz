This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Build log
- 29/04 @ 0654
    I just built out the onboarding page and team choice functionality. I'm super impressed by convex - it's really neat to get reactivity, and that too persistent and across multiple clients, with such little setup. This project is also the first time I'm using Jotai, I was looking for a way to sync state to localStorage and access it globally and Jotai's `atomWithStorage` from `jotai/utils` does exactly that.

    Next steps would be cleaning the admin panel a little and building a mechanism for figuring out when the quiz starts and ends (QuizMeta table - `hasQuizStarted` row). After that I could work on slides/movement, bounce tracking, pounce functionality, points and then the scoreboard.

    The goal is for this to be a "template" that you clone, customize and deploy before a quiz.
- 30/04 @ 2150
    Just built the start quiz mechanism. Some sort of bulk insert would be nice, right now I'm running 1 insert query/slide - which is okay since the highest value of n is usually less than 100. Building the slide control mechanism now. I'll work on the scoreboard after.
- 01/05 @ 0119jj
    Built a scoreboard and wrote code to make the slides change from the admin. I'll work on pounce and scoring next and then direct tracking last - it seems like the most complicated thing out of all of these.
- 01/05 @ 0451
    Finished pounce grading. I was running into some issues with references so I asked on the Convex slack, someone replied and told me to use a workaround. Workaround worked!

    I'll get to direct tracking and bounces next - I have no idea how I'll make that work right now.
- 02/05 @ 0054
    I have some idea of how I want to do direct tracking. I could have `currentDirect`, `currentBounce`, `bounceDirection` in the meta tables. When the quiz starts I could set all of these to default values (1, 1, +1 resp) and create an `answer` document for the direct team. I render grading buttons (like the ones I have for pounce) on the team that has the direct - when these buttons are clicked I set `currentBounce` to `currentBounce` + `bounceDirection` (with some validation ofc, I'll have to check if the next bounce has already pounced) and create an `answer` document for the bounced team. I can look at this answer document and render grading buttons in TeamsTable and do the same when a bounce is graded.
- 03/05 @ 0056
    Direct/bounce tracking has far too many edge cases to bother with. I'm going to simplify this app significantly.


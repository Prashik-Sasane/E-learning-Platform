import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PointerHighlightDemo } from "./container/PointerHighlightDemo";
import { FollowerPointerCard } from "./ui/following-pointer";

const API_URL = "http://localhost:5000/api";

type Problem = {
  id: string;
  title: string;
  subject?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  image?: string;
  category: "JEE/NEET" | "State Board" | "Engineering" | "Doctors" | "Law";
};

const sampleProblems: Problem[] = [
  {
    id: "p1",
    title: "Quadratic Equation Roots",
    subject: "Maths",
    difficulty: "Easy",
    category: "JEE/NEET",
    image:
      "https://thumbs.dreamstime.com/b/general-quadratic-equation-its-roots-solution-formula-162296263.jpg",
  },
  {
    id: "p2",
    title: "Newton's Laws MCQ",
    subject: "Physics",
    difficulty: "Medium",
    category: "State Board",
    image:
      "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/3e534993-b6af-4cfe-87e0-7635088bdc61",
  },
  {
    id: "p3",
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    difficulty: "Hard",
    category: "JEE/NEET",
    image:
      "https://m.media-amazon.com/images/I/61nCopezACL._UF1000,1000_QL80_.jpg",
  },
  {
    id: "p4",
    title: "Civil Engineering Structures",
    subject: "Mechanics",
    difficulty: "Medium",
    category: "Engineering",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMWFRUXGBgYGBgXGBgYGBgeGBofFxoYGBgYHiggGR0nHRkXITEhJSorMC4uHSAzODMtNygtLisBCgoKDg0OGxAQGy0lICYtLy8tLS01LS0tLS0tKy8tLS0tNS0tLTAtLS8tNS0tLS0tLS8tMC8tLS0tLS0tLS0tLf/AABEIAJ8BPgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAECB//EAEoQAAIBAgQDBgMDBwgJBAMAAAECEQMhAAQSMQVBUQYTIjJhcYGRoSNCsRQzUnLB0fAVJFNic4KS4QcWQ1RjsrPC8TSDotN0w9L/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QANxEAAQMCAwQJAwQBBQEAAAAAAQACEQMhBBIxBUFR8BMiYXGBkaGxwRQy0SNCcvEzJFJiouEG/9oADAMBAAIRAxEAPwD0JjiMnHTHEbHG9ZVo45xhOOScWot4zGpxmIot4zGsYMSVIWYzGRjnFSpC6ONY1ONziK1mNYycZiKoWY1jMZi1FmK3EfzZxZxDm/L8ROM+K/wP/ifZPwv+dnePdA/5TzBrKq0QaEKS97Ai9h5j0AkX+TBQa2IF0rdWEc1kQedr+E/x64novIn1xmox0rSTJIPwteI/xkAQAR8qYNjAMcY6Bx0FzlsjGsbLYzFSosXEzHEOMJxCrFlL3mNd7iPHMYqApJU/fYzv8QYzFwFMxVjvccmp6Yhxk4qFMxXbe2Nin6441Y2Gxai2VxqMdCpjC04kqQFgGN45xsYkqoXa4kUxiIHG8UiXRxGRjC2OC2IrhbjGiuM1Y0TiSpAWjjU4wnGsSVULc4zGhjeJKkLJxk4zHLNG5HxxUq4W5xqcRpXVj4WBjoZxIDviSplWTjc4wjGRi5VQt40TjIxuMSVIXOIK7hqci4NxizgflB/N0/VGEYo/ov8A4n2T8M39Zh/5D3XWWz1NtKhxGgHTzI2v0Fj6+2LFB1M6YgGLbbAiPgRhV4Qv86SNggHzFQ2w0ZKC1Xe1T/sXGeif1Gkm8H4Wiv8AY4AWkfKkauoMEiZA+LWAxqlmVYwpm02+Bv0MEH44H5xftR/bUfwOIeBD7Rx6L/0qIxsz3WLJZGkcGYOxI+I3xGucT9Icj8yQPwPyxzw//af2jfswv5YGEP8Awsufn3uIXqBiZzWWTfYgfE7D642ziQJuf2b4GUz4639rS+oTE2c/O0/1Kv8A24vMqyq8rra48W3rabYk7wXWbgAkdJmPwOAuTPhyvsf+mT+zFvLH7at7U/wOBzSjywrWMx0canBylwtY1jCcanFqlvG5xrGDEUUyxGNi2IhjotgUYUmrHJGOAcdA4imq2MdTjicbnElSEaPAV/Tb5DHP8gJ/SN8hgxihx3MNTy1aophkpuyneCASLYydK7inZAq38gJ/SN8hjP5AX+kb5DC0udzUf+qqbD7lH/68d/l2a/3p/wDBR/8ArwPTOR9EEw/yAn9IfkMUM5woq2lWDGJg2OBy5/Nf7y/+Cj//ABhV4v2pzNOuwcrWVYHiARtp3QRz6YJtZ0qjTCbjRYGCpnf5YiWqCAQRBiDNjO0dcCOG9vKZtUJp+lQSvwcbfGMbatRbMKKfgVEpooDaqenvUNulmj4DDBW4oOjWcU4u4qLQoKr1Dclj4EH9aPhgZxjM1pFCo1Fm062g6ImyiGN7j+LYAcWrssgNY01khpJhF3+IGBuUzVw+kSZA1eIC7AlTJvE3OEVaocC06FX0cLivnq2VzEagrgBoUysNEEwYg236jDTleJd8AyZjTViW71iEYz5QBAGw2/fhRSkWWu0GXggkb7m3pIxBlqrFBNpIBH0/bhTXQbaIci9R7P8AFalTwVVho1Ar5WHofcYNY8z4JxKqgZqRYsjtKs0KQBJUW3iSAIsOeHKpxBcxlHdZEgAgiCCY+l7HGym/q3QxeEbnGpwNyl1b1pD/AJqgxukf5vSM7il9SuGypCIYoZT8wv6uOCxD0Y/on/BDiPhucDUFsywBupG/4/DCcQZpP/ifZNw4/Vb3j3Qbg+nvVYxACzt/Ru0f54ZuHkBqqiwDiB0+zTCpwoovieI10STzE0/S8e2GbhiBe8VdgygXnammM1Kelb3H4WmqR0R7wos232g/t6X/ACE4j4KftT+oP+WmP2Y1mj9oP/yKf/Sx1wqiwqFtJA7sCYMTI/djWSAbrIJhEsk35z+0b8BgFlz9mp/4OW//AGfvwYybfnP12/AYC0/zQ/sMr+LYh3KDeis+Ot/aUP8AsxPmI76l7VPwXFRj9pX/AFqB/D92J8y321H/ANz8BgufVDz6KpkT4Mn8f+k2L2U/PVv/AG/+XAzLmEyf6x/6NTByjU5/x0xyto7SGEYIEuOnlqVsw2FNYknQKwKfMEHETDrjunUAMdcbrEHHP2ft59WqKdYC9gRx3JuIwIa0lm5RY1jMZj1ErmQsxsY1jMSVULqcR1q6qJZgo6kgfjjZOPN+NVD3ry7CC+9QL02C+I/MYEmEYEp6fjFESS9gYmCL+k74tZLNrUQOhlTty+mPKOGjVB3OtZOg1D/8tv249I7M/wDpqW+3MAfQbYprySrc0AIwDjBjgHGYNLTrilxmO4qTEFSL7XthSX/SAkkQxifuAGyz+l1j4YHcb41+UaXAfRqEISNh5mid9gOmOe58LY1kpc7Q9squWJAy61AIgq5veOSnE1PtXWZKbClRBqU1qaXqVFIksCLUiDGg/W2HDLLTpqFSroIEhSmWI2m+xvfczviWqtUOfEmnUskaJmNwsG0Rz64SahgQCnspjMZISnlu0WYYGMvTc8tD1mB+K0MBM0tarUd6lBqc3tTzDCwHNqK9MNfFuD0gwzFXyhp1qtHTpLbxRcO1uoPwwJPDqLVtSZkhCwYiKqkgqwmNQiGCiLG0zgekcCm9EwjT3QheFGosoHI6inUI/wCXA3h/Bc2iBga2obsKFYTBY7FQd9J25e2DvFeztIAvSqvUmQVV6iFvfUTJHq4F/bCzxej3dQ0VqANCwr1DMtJIlGIi4+GDzE70vK0ft9/yin8iVTYpW2N+4qXtzxBT4XoZUJqBiQAO5IJuT5S04C1C63O3iBPevEgCBZ7eK18c0xqIBQHm3jeFHiuSXgCIN+uKh3H2UBp/7ff8pqzPAqlOnPiaUNipWNIKwZsBcbkb4oVOAZpkBWkb1AwMrBGubGehOJq6p+Q09WlwFaDcj848hdV4lhf0xS4ZTDB6oAUqSLSBDBiwC7XCj5DC2F1z4K6lNhcIESNytDgGY0nwKDrJk1KQ+N29MWkpVkpt3p8R0Aaa1IgBRaURpJkm+AvfeFkmxIJAi4EkX5XxrQA4ePSf7oH4mPlhvWDkghvP9L0Xs9nVZYYgMViJF/E5t/ixFl6qkUCGOlaape0nvKd46wuFLL1QrBjPhIa38egw0Us7Sq09NN1keUEhbrfT6Yb07pAhFToNcHGe5Wq8mvl1W5FJp8WmLL6HEHDCwywNvE8QW56wLeHe3XriM1v52h3ijyjeII3E3GKPDswO6o0yP9oT7/af+cHWf1Hdx9kuk3rt7wg7VTa3KkDf+oPTDl2dZ2T3CHrJ7tQSdr2GEDvBP95N+UIJw49hnJ74Db7M/MEWPyxhxWI+mpmuBJA077JzWZ+pxTbkaCiWiSTJPqAFt0sMXcUKFS2LL5jawEfXHgcTXq16pqvdfnTgugKQaIAsqOYoinrIkhiW9jG3tbAB2Aon+xyw26McGeK51VUlpiDsJ38I+pGAdTPUzSaC35uguw3DGeePe7HxbsRhWmoZcJB+PRcvEUsjyBoiLka8xH/COIuO5w0qlFgFP5yxYr930U/xGKfFuMU0euApYtoF9NrETvf4YU85xVqlVCz3Ab0FzPI8pPzx031YsEltOdUy8N4vSFNBWYIxA0EkadJEwCQNLbzOGCk/qI5EXB9iMeZcTqDuacHU2mIkwx22n93LFHhFBKNMipmalJ2qQxRigBIB867bHccvXHAx+zfqX588Hhr/AEurh8SabMobYeC9hFSMZ3lx7483yy50IzjipFMbMyCqCDt4hqnleMW+FniC5lfyjOh6Q1ELTABqQOmgWvzPLHNZsOsxwcHtse3d4Jn11N3Vyn0XoZOORUHUYW8xxCfzffNMi1NeViJtGITlasLVVlWw8W7QeRDEAx6k+k49f9SJgA+i5RwxAkuHqmrUOo+eNGoOo+eF2jxYK4Eu4A1MSacEkRAAgiPW2DKZ+mTuANKsDI+8WEfDThzagckuplqsd6Ov44864qTrqEB4l/KtNR8S18PD8Yoj7073Anbl9ceacW4gjVKngE6jvT1m55MGjEc8KmgrXBXBUaiPOvmrEDlyX+Bh/wCxtM/ky+Lmecj4E3x512dzUKPMPGLqiT93m2HjsxxXTQA33IBgE2G7CwFxhbHAG6N7SRZNQU9fpjYB6/TFLh/EtYlgF/vCMXqVQMJUyPY4eHApJBXjtWp9pIuNR3CtbkfCR88HMvWVqVBXYJL1SG0gjwqpuS4i5iLzYWxXpA/aMUW7QdVF5k1I8wMA35g9MX+G0SwyxAS1StuwBsOQJk+XltGOZU3c7iuhSi/O8IBxrN6XqkAfnnWOcEteJE++DPE87WRKWlabD8ldtrFg5IUX23m+4xHxCnLVAAf9psK/6Z/QG30x6grAHT3UkmnHlgRvJNws845jmYxZEgc7lbCA48715vwUCpkqlau6JUBYdymnVAIIIDNNz67xi52czRWsj1VEd2SUICMAtRiLajJgcjckegw7Z/LIMukhZJpyYHyHp6ftxmZr0O/UMFALW1KVBGgAjxADfkfTrgHtv4hHTdaOwpKzvaaoAAyI6GSDMxYHZiTefphfzFZzXruKYJgFRA0lRUhQpETYDph27WUVSkkKvdu7EHSp0kiTeRYzIvvbmBhZzDxnajlXCvonTOlYAsqqTDCF5+sC+CPBUBv3IFmMmgps1WiaZkRFmMqxNiYH6x/QG8YhzeZTUyhPCQsKkaSQTcxubEXnHecyqk1NL1ARUsD3mwVwd7tcLAN7N64pHMCfC5vAO8mJH90WiBimqnG1udUwUKatkaSusKEaVnpXESRfeJGO8gAEqkc1NrAL9lVmBz6/HEVJZyNOC06HHv8Abpczz/zxrhtT+b5g89DRv/RVcJ/a7v8AlPEZm93wg5EXAHL03m3rgxVIK0upD+1mn9uA2ZYgtPKPwb9+CC1PBRPpV+n8DGh2o53FZWaHneF3oDGPb8Ti/lKotTKMQ1yRbVEWUgggljTnmQOW+B6vcXMTHTnePpjrMO5RlSdRACsPMsiJ97nB3a6HK2REjnRX/wAooO+mudUGA1KmTSJ5KXk6iDYkDr644r0NATwnUrkRsyw4A39Ixzwqro1oWNJBMGbuAR4ixuB4tICxJmTYze/kypmHKUyTAl7JqQEqZqSQttP6Xpc2FVXQ0uJgI8rdYQHMKRViOSnnH5tD/HtglwntH+S1kVh9m1MBlFjJaQ1+Y2HXbGcR4TXNSmBQYkahNIawfBTAJ03+61/f46rcFfu2WtRenIXxVKbKo2J8REDYWnrjJiOiezJU37t6lJ0OML0LI56nWXXSYMOencfrLup9Dicudvxt+OPGK/Dsxl4q0nMRKlWLT+qynUBi7wfj/Fsy3dU6pFt2Cn6upOPPVNhuJmm8R22PytYxBFnN8l6B2lqqmWqF2ALwq33g6rdbwPiMJFbidI27xCSyqIM3UiR8jiTiGVqtPeVHqsq+IsbjQwLELsq3sB05mcVsjwKtS1PWosukuwk7atKTz+9I9CMdzZ2G+npZZkzPos2IMu54qDM5yXsTDMvIg7A3BFt+eKGVqlmiJ8OwME3Gx2GJ87QK5g0y2orWAmdU+EHeL/HFHLL4yGDREWgHzDr646KzIklESDoCmLEMCSQIgyeX7MWMvSWvKVLMCbQBE2Nhv774o1Epym91PNTA0cxE7YMcMpLlg2arU2emjkAMSqsWMDU0GV3MAGZ5DdD6ZfoVop1RT1FlTpdhs0kVErrl6BM96zsg/wAP3vwOLnC8rRyzNGa/K3dwrsAwIAUkASSTuxnbDrk81S7xS9KnWZ11p3kMWTeaDamWAJlYDWJI3bDjQpUK9HwoppndYAgj28rDqPgcYsVj3YcdZhI4z8R5aJIIzSBC8oylZTr7sVH3EhHJEkbgDcfu64natChdOYIgHwpVMGNxAg7extaDgpnOxFSnWYU6lQ0qkspDsGU2lWImT6849MQ/6sVSiHvag16WX7ZxEgTstgAdvTG6hihUaHsuETmAt57UK/KNPiZWgqGBgnUo0iNOmZvNpF9+lyjxIAeFKhBJlTTdpgD7sT+3HGf7OPTqUhrcmqNCzUYxD0xIMeHlsMTZbsxWepUo95U+zN/tKl5VSZIu0G18NbVMQebKVGCZ51KkFVSNS06ynmjUqpn9U6b/ABx55xJgajnY6vva5817cselt2PrDerUAkD87V5mB9cecZ7hlbv6lMajpdgTrMWJ5kb2wwVCbFJygXXPCSNAnT5uhPJfUfx74aeBZ4U0VoJUgrZS17Egr/GxwpcOVinOxB39AOmGPs9ww19dDxrrQOGXXINM2IKCfKXEXkxgS6EYFkxLxGkxiKiN07uoQfhpkfXEA44afkarTmdhUAMfCMUP9SW/3rMdbDMxe/KnBHtgY3BSFVjWqHdYK1otBnyb3+gwXTGEIpqLhZ11EQBBNR5hXJOlQw9/YGR7YPnLOoowofQ9abOdwd7+h3/8gOBMVqLVILQzCC+n7kEgievv1wZz1QNRRoIDNVJAgm+oWJi/7vTGZ56w53Faabeqed4QzN51DUqOAGU94AQpMkuY2f6/THo3D+KK6iqUCvoB0HSoOl4ZecLaZ5c+c+RUypG8RMCUtcwN7nbfHqH5PpNMlpC7rpQagTIXykgT0j354qo4Ngc6K6VMvk86o9mM3RqZakV0HxUtQGmQJAOpdx6zjmpn6LV17vuwoMliBoHhAsB5vvWHQ3wH4jlwSagp01DMmpAzQbgC8xtyFj62xsagRcm0CFvqmNW3Qb2+uFvqgx3pzKBEzwPqu892cfNpsoBjSWbovKBAutyB84JKnxCg1HOVe8dD4F1EA6SPFpkEAH4deXN4y3E1pEmsJBiF8oECAIIE7n0/HCD2wzaZjN5ipTE/ZpbeIBk29uV7YMPB0S3sc0yVT4jQVy2iopLVCdMjkagkR5ZENH9cdQMB0LSA9JjHM6tYGsgTPmI3v8+eCuarsQFNOIqt1N+8qEjbbUzC3Qewp1GUuwcsY0x4fF+cgAEm/S/KdsGEo7kVmMmhJEaKgkW/2yQIPP8AzxU4ZVAo5lZhu6qc72p1RI+mOs7FPJUijSPtQpAixq07FTvYkEe++56y4olXgAOcvmNQAmfC43ncb+3yK46p7z7pknMO4eyDVnk1LjyKfedJ/wC7BDKkGnSvyreuBOmWbkO7TlG2gRi9wpp0Cd6dQ+234zh7hz4FIYefEItkctNNnmdLVPDYi1E1NXmH6Prt8CWyfCwoZy0lNSkC5kITIM+2IslUilUUQZRouLk0K6dPYYt1uKKr1VRGqipVe4EgqaQHmIEm5MRsMC55JJRhsABAMmhXWiqxCguk2KyBqcE7xBIEHyjHoPD8gadClRAh2CtUAsC7X0/qrsPmbknCLlv5xXRYcAd2hE6gZfSQeQEEt/dPW3qOW8VQtyvHxsPxxhxlc0xnOjGl0dujflR94CKZPKKigKOQk9TzOOvvR1uP3Y4oVTp9pxJmBItvaPfcY8G95eS5xknVXCF8S4FSqnvEBo1ZnvKcAk/1x5X2HmE9CMAOF8BzOXzGpu7qUyVJKDSwhdMmmRfrZjvhyDyA4tO/v0OO6jKFLkwAJPwxuwm0cVQORhkcDfy/8UmF5suRDJWM30V1IInyqpset/hbBLtYH0VTMAU5Pr9uNul4xcfVmHI/pJEdAwg//H8MLnG86Wq5oIdVMd4gLHVqKuhcCNoYvG/kM49o1+UtY+ziAYG7x5m6jnteZSfxZT+WVJ37/nq5J035YG5Z4qkg0wb+YW895nE3E6FVHcsDJq6pWQCCCJGxj3jEGXH2rAqzDxWB38XKMbEki6IDUzUVFSlzmAsglRcCNuduWHTI8O72vTy5dVp0YrZhjBLVGEqhPLQsCOQGFLhNHUS4QoKVJn7wkmxUKRGm50lo9RhpzNSrlMqaYC1M1nDrdZ8ge8COcGJ98XRkk+XPohebqDOI2czrVaemlTy6NoqjwgOJKMRsIYAzcRIuNmzszxKXpOF0rmaYcpyRwDqA9mVx8RhX4rllyuSXIoCK2aZVqJMFQxuy9Iv9Rgh2ZQUlylMHUEeqFbqrZioFPxWD8cYdqU81O28OH/UkHwIHmo3VehuTBI3EEDr6fHb44D8Orlkp+FSBQKiWjYJq+7a8CP6pwXBsceb5zgDs9Tu6lO1SqAFlDBJBXV3ZuNufTHF/+exHVew7oPnr8J2WbItxDM6q2T8asVeCoYGD3ieKwmD19I3wU4XmmGdzC6LQWLarCNAg2/iMJVPsfW0oaMEPYEPTIkFXN7QYpnccsMB7HVGDaq2h2VtR1JfURYlSZEY9CwxKOo0WHOqu9te0IpZZu7q01qsJpeMGWUg2kaZ5wTjzapnsw0sKdNnKjXDIZYtJsKvr9N+WL/HOz9OiKiis7MgA+zdAxYnVppwOgMnlYmcLefrVwhcGstgBpZxqJKyYiyrMAc7+uGtMiSkuEWCZ8vwvXRWktNQWqISqjbTlxqMKZB1LHv74YexdQ5dyaymmih1QspA/OQt4gkiPiT1wtcIDaaTOS01VVi0mz5dGb3Jck++LXCuGUmq1VeAEFTTqiD4VYRInqRHpjPmIK1ZAW969OyQUqNKkgAb6QfiCfhjxbtfxOsjBKdTSgk6QENyWBMkE7Kvyw/8AD6YWmVWoy93KsqkggP4gJRwDDE3uDq9LInbKjTo1lGqENNSdaKxLEkSI5QDvh7XZlncwtUXB6gUDxaZdj59G4F4G/vzj0xaq5avVo0O7BMd595RPjO9vX0wEWoQAYO7GNRG8C0X5/wAQcGKtf7HLC8yZ8RAvVeAep8JjAFpmed6Y19o53KtlOzubEgwogjxN+5PfD5VzTgKB4mhgdDoOkeJotvYdBtjy/O05r1dzNR+bH73rYYcuzWdBWlULfeqgHWYGnQYaBBBEi+02wurMB3OiOi4SWjm6J5jvDTCu4VjELNvC2qXYagBYWvsMdZXMrJpmqjNpgga2uWkG33Y5xyxcztUBp75AVZDpWowEMwU6pJtB32GKuazAOrTVm4iKpJkRIQAjVuJG2EFx3rQBOi7qUTcJVoT+ggEz/WGscvTC7xLhZaozvmFUuoQQAdp5CrOx9MM2XquPC48SidOo3B2a4I+ZtthB7QcRrDPVwKhpIFpwDUJUBgJIAMBjP4YY0m8BKeBAJKLHs6haTmCdyPsma5M/dqEEwTJ6mbY5HZlJnvXO0RlTYgzYlvU/xbCbneK1Zf7eqbuQQzaY74LyNhH7umKeXztUo5NVvKYlmJkRt4rHe+HhryJlZy9gtCeM/kaCZdaNR3gGoQe7VWBYoSSpfw3Agiee3PKdXIIhepXqDVTqJanNqmpZlSbgsflgVl2qHKIzEltLLebg91vN5i/qb+uIOHZJq2mgqd40GAACf9pFthut/ScAJymeKaQMwjeEarZHh66wa+YlU0kaFBs0XlfNKx8NsB8nUAICFghDEFgusKAsA2gkgmRtvi12q4XUy9Ud4PDVUMDMyUXUwnqDNuhEYHZCnKnkO6ci5tCBh+GGbpnmEkXMRzIRKswAJDnykxMQW1eGwvsLevri7QRkAaSRrA8xgwpM2ufMDisoU6gpLEISbQABriPhe+LmYpuFICMIIEwBBKgEeLnzPoRiPmYVsiJV/shl1qZvUP8AZUxU6AHS68zeSwP907c37hZ8NTqCI+U/twl/6OaDflFYNBDUgAb7arA36EbYe8jltJqL7H9mODtcuFGsd0sHlf5QjVWqR83rfEsyvx/DFGlWGoA87fuxZo1osRzx48ghGCusvV8TKed/jsf2H44p8Zr+AIDcm/sP84+WLOZWHBHOR8xhd7QSG71T5YDr1G+oeon5Y6+xKPS4tpP7RPwPW6FxgLK3Ely1CpUFqpHd0gYjWb8+gBb2U489oOApQsSyqQ9iCdZDjWT94FBETYG9zgn2uzr/AJTl6CHyozNIFmqgiSWsulQ5JkQGwH4hxBVUJT3buNbSKjGG7sl32vGwvvJmMewwozl1U3zG3cLD8+KgENnnwVV6FaoFVCAQzeJgbLGq43JvHxxTr02SqWLEAhodBYSZiJEGN/ngh2XqlnIn7zgDb7pte33RinmlUV51JpKtqDFNM87PadpxtH25e1Jd92ZMHZwFgiGp9l+frFrMaaeEqASSdTBNv0sGOzSU8xWrcUraqYWe6nYBdv2fEjClXlVZEH2jvSoIfDAUqGcAbzZT8sN3bPNGnRy/DEpyakAxz5b9NzHQjB0xlb3oNboFXztas7Zky1eszZfLhCoKqVs4A8W4Ak8gxO2HDLZDuqmXoAz3YopPUiJPxufji9wHs/Rp1BXUSwpikpMwiLbSqnym1/WccVW/nJc761AH6pC/sxwTjfqsS+mzRrXDxsPS6cGwLpuQebCFnM21PMZyixKoai1EJLAaXRVfT+lD3Mbar74dKnEaSKdTgknZSCd+gx5d2lzrPmq5ViFZ/AxVTpC0FdwLEw1TuLSL/TlbAw9Rr3Oc0gFuvbIKcwF1RrW6kx52R3I8Q7xqQL7EggNVt4HgzIHIbYlrcTTu9Rd9JG5aoCBJGxJ3i2FHLaiZLA2tAI+54ieXMRHrgzkajeAQIJufH4VFmJ021HygehMyRj0opHLnnmFKmJDcScPawM77zHpv7e5DeNZdHpaxTC6FY1BKyJiKbM8hQbSd4HqMKtTiTpD+CNK7U1OraBRQ3VALaj+IjDjxbhpZSHBNMHUtNVeI5tUKyHa0xaBbbCvxjJ0B+cVQWA1nvHVlFvusp6bARh7NEuprKvZWtUCUqhcBmqA2RIGsUzddJG7kWAgCRfBLMI1ZHD65pFAynSNSG6mAgk6tIsBYKBuZo5SrRbu0VjpV1KMZh4NLR4tI30qI3meowV4etOa1IeLWVDLpqqREi0qCDEkHqJnnhW9PtA54orkuIFQsMJgyTENFwJBAvq1TvhL7c66+akSwNJNJGm4VnndurYYaikM9JkYjdTLQ2kEmH0WtJESSY62CVaPeGF0OBuNRseo7liyyNx5TbmBi2dUyUNTrCAsynDluDWpWm0oeh6Hp+GPQ83wdBkKVOlpD02pu7FFYEsSzDa/mMRt6Yr8H7NlKivXzQdQZ7tANLc4mJAncXkYZOJVqlVGSkaQUqQSQzMeVoK6TJ5E4M1AAQUoMuCEv5Lg1CTVdFYE+VZZuRLXkA/1eY+RIUsrTlVoMNJUNe5841Re1gPmMDP8AVIRqBzCs3TQCSf7w/wDGK9TIIgVTmGtrI0sGLE6QVJVvEdz7kbWxnc4wJHMFaWNGYweZCYuOVO6ZURQR4YnqWgkx12m18Cc1aqSoJDFTqJU+UwJMmzX5z8sb4dk1RTpqZqoCySKupVBkEQGCgNtzx1xKm6uxVQWAFvs1UcxY6pJ9+RwNTXngUVLTniEDzfF0Wr3ReqWXwsVZlVDpPh8TQeUyOeFTtBUL5uqyg3SlGoyQYgnYWnb2xrjS57vDR1h6LVF1BFFNSSRIqhBJF77jHSZSorMAqrCoBphhA1ELe1hO8X9sanU2tiAs2dztTKGDLNVbu0bU51grbfvkPK/USTaOmIWcUyQpQu0iYYqt48AIudS+b0MC8lryvBalWjWqzIpEkUk1SSSG1E2FhyE32jmMyvDBVp1qyAaaQQgsLHxHUJEwQJPub74JrZYXTolOd1w2LkKLs+2qjLHV9qwMyZ/NW8Qkn+Pa92UzgpZsuRADGfQEuOQ5BhYdMDsmzJl3lDqSu1lAvPdCPffE3BMoxfMOQQNKi9jLXj6EHCT9ru9am3qMHZ+VP2t40mdzIenq7pJQMQb/AGZ8RUnwzAHLFPL5VqYIIM90Qd+aERf0GL9Ts4qGr4ie6VCAsKDOo6mGr0jnibLcKKOFLNpZoAOokAq1+e31nDHNtCQx3WnnVCqVAxJ3KgHlNtj9Rhvy+XI7wFASpW8i0oBA3n/LHNHhlMSTUkmroYNAgBnXUAYi0T6nBitRctmNLiNNNpgXsTaNtjgihHBVewVM/lTSpAanE2+6o39enxw7K+muqfpKx+RAI+owkdl1annUUa9LUahlgRcdztP6x+eHHiAbUlQXKT8QYJH0xxdo4rCF/wBNXkTBkc/BUE6hZnsqQTHK4OOqD6/7w+RGCblXVXH8A4UMpUahmGome7PiQ9OoH0tjlVdkUqg/0tUOPAkTz4K80ao8KmpfVWAPpgZrDgkiPEQbztc/x64u8TbTT/KFvFqgF7czHpvgfQNO1RidFXSQPug+Uk+xIHS4w7AYXEYOnWc5hzQIi/Hh4FQmV5txSjTrV83VZ6k94KZFNdXhQRpJ1LoEoCQZFgeeI3q0mcUaaSXVjaHaUqax4hbdRAUTNiTGM7SZPLmtmw6kFK/i+0RD4gWE6htfe/SLYzL8RRHQUEk+ImDc+MSpcAAzfwoBIm9sejw7S2k0ERAHsnNAiBF47T5c+Cq9oeFtTp1QSPCgaVEAwCL85OOOGIEaQBqavVczFguoLbnsT8cM/FeGVcxTajTVS5pFPE8XUgMBI3kCATtzwHyOUdMzTSopALs41WDAy+md7yfTGhzwxpd2LIRvVHNJUXNZUMSrnMuxBEQxK8vbDBk6lb+VWZ4dVokMd9Hgs49bDA/tLpfOZVmlT3yT1APt00YqZ+tGfrUqNVorU0pmNxqKqzfAF8BSqF9NryIJEqN0Tv2X4jWfKUj3jEldzdmgkB5IkTvHLFqnlKrk+FiWO8H5knDVkMsKaJTpgKqqqj7xgCAOQFvfFxFgzJJ9ZP0G2PJnb7WuJpUQJ3/mAPdPyWuUv5Xs45jWwSIAA8R/GB9cKfaHhSq+aYuwAZKSEgEGEWo8XG50i0yaYx6gjDebDcm18B6DrUrVVgEXEgghgQpJttckc9sa9lY/EYqs7pDaNALTI8fVHSd0T2vbqDK8hy2QdBOsEuiwSfJCoIAiTqIJNug5kYYMtxEIO7aCxNyjMCtpEyCBJGwBPoYOGTO9mqLKrKClRqjIxpneA8HQTpPlHwwE4jwc0CO8RXpC5bQUZAdrLKbxMR8dj3BpBRvDc+cATe/YStniFNiS7MsC5LA6R+kyAHUJtKysz7YILVybU71su/61Mx7GwAv6YVMnmlp1y6GoUk6RUBciREqupQp5W5WO5xz+Uopdbim0ai0F6kTGoKoVdwbDf18WLBa3RUZd9yYKnDaL+PLKSykeFKdLR4SIIDjkVWIPTAjjGbz1GoHTLAQDBYIu+4I1KCOdh05jG6Gcpu7IlPu0qGSGqVFUGAAEC+G7AXI6dLk+CcdzNDUpFWogqKq6tNUBJhmLaQwIH3SfadsW08ULhwQk9pc0+9IWgwEJII5hhMdbnEo7ZLbv8vcAiDTKybXMqQSINw3M22wf7RcNbMSyUKRsLtTpG83A1KG+M/DCuaNamSv5BTYzc0w9/XwmMHLHDRLIe06r0fg3a7LP4C4Qjm6qsz7WwSp5miz1CpQlrggpeFgkXm0GT6emBdXN5HLL3IuSNgDUPikgzNx6A4Vc7xFauk5WizlJGo0vEszK6dOlZBnYmD74WSbBGALkJ2r8fy9KNVVSwhVUMtvckgAne5mOW+KlbtDliWZainVTDCATZGlyYFuW/pjzSvw7MFpNFyWPmZWknnAYG3vJ22wWXhFWnSooaBZwasABZAqBVLQthbVFjy3wL93O4oqY153hOea4/l6wVqdWnYqZJAEAzDaiLfhgXxLiIZWbSAWWZMDTpJGxveNvacB8l2OrEadFGkvQLqYD3cGZtYkfDF9+zKgFKjal0GmUAuRUbX4R1vE/QYp0SD2omSBHYlfOdpssDVaarEs0impAa8yXa2m3KTgbW4xSZjVp0+6V1UKTLwPISxM8yb8p52xf7TdhH0gZSk3iMMTULQPYmL84xJR7MNRpaPMyoB4bKSTezCd2B9x7Y0OIKS4AfajnY/KO61hQqslXWGm9RGWI0wbC8zFxYbADB3jVBKeWRc2QZKgsPAurzBgBAFxaRvGAnYvgxpPXeo8MzQoF4Am9upn5cxjj/SJnVOWaiTT7x9ISWAJOoHnsYB9+gnEDWm6hqOyZefNBeP06LU8w1Bgys2swSQCxTV5drybHngdwvKU1ZipBOkAQjeXQCYMGNuZvGGPshwkoiKQVOnXGsDVBH9bw7C1sHalEaa4vpVjU1agZOkWjUfXrhJFnAJoPWYe5K1HOUlpmnD+JESdDCwlYIMczMnBzK8Sps1NxTM0yZLwAfAf0JgCfjhhyuUZWZzTMOAW2sb+/JvpgBx2uCqU++06QPKyidMzBkSSukQSLYaXcUgN4Lt8w3dM7d2qrV737wuzkm8GREm3L44rV+LUTUdg2paiqinu4aRI5sIgsLwfa1xn5dpqQRXqPEMrLAgRJKybmd8NGUq0q5IQU2Yi66ai7HcDu7kR9N8AXSiDYWuztNalamaRBZVdGXWs2UEEqCdOx3/dhprUyLEEEXE88DeEsKbUwQNSwSBa0FYvfDSmeptAkT0b+IOODjsHh8ZWIdUyvEAA7xE9nHcfBSp1HEDRB8jU0NoPla6+h5jGcUyAcSBJFx/lgrxPhivTJQAOBKkdRcWxTyeXNWktVG8RG0c+am+MFTYuMpEFkEjeDEeceiEVGkITQqGnLRrpsNLDmPRhimlBETuTqCatVMkA6Qd1JuGEEjfY4O0KPeA1KZGrZ0NrjcMDcH1xs8PIBIEDmpgrgvqNq0+rDvKfWCrhq8c7erTFd/siysKeqoUMqQCgDsCJmJJvMDpiPhAqVHUUab0qQD6nvSXZm0y0s5IuFke2PRq9YOQFHgKliBfyMpE6mAEH9vvibMZNnRlaTqjkoNttqm/r/AOMekwZqGg3pfu3yiD3DRA8zkEo1fDYEDVAsoJhXI5SSFJ5kTzwA47wDT9osTUmRMmQkxfayk9N4x6HTRmMyQyjT5V2PXxeJbD6/AXx3L6Kep1YoojSqlmBYaQUCS3MiIO/ph9SqWNJFyBZLLbSvH3zrU6qVHpB0BGpdyulpVweTRYkcrex2nwqtUz616S0zTqgUw9OoIpBllmLrOhtOoC5uQMcvkg9XQVKj9F1KNe8kPBuI3GCOQ4rlslrVULuV1MKYBgLubkCQJOmcAzEPIu26aygMmZxgJqy+brAaadR3tvIO1pk2nEqjM6ZIrAk3ux5dRbHfAO0OTrhe7q0y8WWpqFT/AAGPoDhmFdTZwJ+I/EY83iNrdDUjoAOMiCo4MP2kpTocLrsCe7cyN2t9WwR4AO6d6bSXRQzEbANcQSb7NYYOqlOZKQf454V6tWtmK9RsvmKcGV0EWIXwyGgk2jaPjz37N2nVxlQggBoG6UuIRrO04rUjHmqAzB3FN1Mn20x7HE3E+E0cypWqmoERzm/Q4gylHMNoNfuwVfV4NVxpZbzbnOJeJcDp1m1s9QGIEORHsOWO0CAUTpICVOKdgaKiaTsWmNLVFgDpeP464FZnsI8mda2EGUPzj9mHfLcBpUpbvSTJYlojbn062Iwtcd7RVkeaFZnpkzMHQvUK55Re4POI5AYRNBKp8E7LVKRZmpirYgBih35rpaRyv74c+z9d4fVQZCCAYUKDbcAxPSxOwwuUO0TEjXIO88o3kwdt+ZWNzyweyjVKgBRKZkbrAJHUFXB+OAFSDoUw0rahGxlVcTpKE7xKtbrpN8SHKJ+ivyGAlHNV6XhIUSfD3jkk+gL1CTghl6+YO9NQOV9/kTgxUHAoDSI3jzXnb8DVmP2tQap1bNOo3uY9zf8AZN7g3Csrk3FT8pqHV9w6Upn10mxiPwxcqIXQGAEaIJJE+4EnpOIaGWcUyoZfCQRIaFA6iZix2OMwqOBWx1FhCaaeeQGF1NabAW+XvinnOJolVQ0kuNIUDxG/Kfr0timvEr6qfhlb7eU35evxxBQXSzQZPnZpZifEBHiAtBNtrcsH0oKX0JCP1M6F0gro1EKJPMmBA5nG8xklN9GozeZ5epO3pgHVVZLU2PeSNNRhOmN9KzEnxSfXFjNce8a01py1tzAO9x/hbfBCo0i6B1JwNgrX5QQCWpERO8QAOduvLFb+UeiL7z/l7YCZ7iayVqHVKmZk7EAjba+B3BM+rUVIquEAAuLwojeJgi/XCHVCdFpbRaBdW/5DWrUZgrs7MGJFVlibwNIB6W/yxar8CpI0vSRqjWUTqYx6xKjqZxX4N2jQMQgaoIMiyn+qTPuBbrfnhhpZhQz1NN4Ek+KB0F7DbBtdpOqW9sTAsoKhNAhlADkaQoJMiRvJ9AB8va7UztSnSDsyqIkyNpud/wBuBdDi1AHv2DazaYkbWgE2t8pPXGs3xyhULKyVmEglYphSR/fBIthk96UTfcrb8WqOsyNJ5NpFonxbwSLxFhgDw7M0K9QgUhqJ0yyliTtdmNiBv0uOWCdPitAkhcu4vDTpvzGz/vxdp5yjDVtOhti5AJBa0gAGTyxJVTwQk0Mu+YqI2XApjSjVSdGomx8oH9a8xaOWCr5fu11Uc2FVdw+l1E7CRcYgKo6qixUphS7apEiygkbkzNvVp3xTzPDE7oqoTW8DT3alQY81+QAmOcYt2tlTNLq62bcVA1VEjya0JPmII80blRtguQHEjf8AjphcydGmlMCoFZ/KJQEkNyJ22wHpdrzl6jU3RqlJQCHBGsWk6gYDAdQZ9CbngbU2ZVrO6WkJI1H4QVIF+Ke8vm2pkKxIU7EEx/ljulWfLsWTxU23G8eo6HC/wntLls2Psn1TYjS4/ERgrl8yySpGpek44rKuJwzoBLTwuPRLsUTXMEOa6AOrRqAsbc/fHVXijsDoRCIjzmR7grgelvHSMA7qcVuMcdpUaZrVRAXmJmTYCB1PwxpZtbHHqMdJ7gT3aKZWob2koOuXFOkoWfC27GIO5A633/HCzk+K50+DXdIWACZHKfELR+GKuV7aV6ucSrqNNPza09/C5F2gXbUqn0AgcyW0ZV3D1ZVXDMkqAJCsQAbXx6jA0KtGgG1ruMk79SiYQ7RFOH5tqizztBKsl4vZrxM4JLUY2Nj064VslrfUCyyHInSP0VIm3UtiHN5qqlZUVhAALGIIDBxaN7qn8WxrKMBJ/wDpRypGdBGkM9NHMEgiCyzuFMgDe/hwtUSUsKgAI2gWmxBMH1GDnbWsXzpltRCIskcoJ6dWOA9VSG3Ihhebgi9rcjjo0KYyArnV3nOR2qVKQadSU2HoI/A4KZSu9K1OrWpiLKlZwNv0SQMDFqADU7Bwbyygn1gcsTUq4JGm9tjqH0FsNfSY8Q9s+qSHEaFGxxau6lWzNYrBtqifSVg/XDbwXh3eUkKkUvsgFkkljAudOw8v4+mECkXAgKtwdpuTYC5tywycBzQXLpRrrIPmJMlSymsIjoGqr/dHUY5mKZSohopgNk3iB7LpYFjn5pvbv90y9meP1nd0qXWmTTLc9SkzvciBz64K8U40qpKGSSROmdJ3llkEraLYXNWRo0A6qSmuPBqUy1zaQItjl61EgfZ1EDatDagQ0bGJ1CxFjhebMU4MDRdXcxk61QyzUqoMW1FVHXwAX9iZ9egbiGfdGU1aPeIhsoIFP0inYx7z8cQPFQ/YVq6BYEShBvsZEre3hIxOtVkWTVYgxc1HmeYClGHON74XInVOymNFNV7VUKhCtlyoYTKxHTysFsP0lnaMR8LdS2rLV1pzfSWbSSQZkACD6i/wtinxDLk1FLSqiI8rSzG2qAvT19cW8twohRV0qSCGJEAXspE7Tq5dfjgHVJsiZShEa/Fs5SkV0IX+kQ1alOOpKtqUe6geuL2Sz9aooNB0db+QvbrafXFTLcXrIqqhhSTaF9TFwfT+N+14lXRZpLRWozEt4AAQdj4Yvb1wPVP9lEQ8cOfBf//Z",
  },
  {
    id: "p5",
    title: "Medical Ethics Case Study",
    subject: "Healthcare",
    difficulty: "Hard",
    category: "Doctors",
    image:
      "https://m.media-amazon.com/images/I/71P7rrqtvtL._UF1000,1000_QL80_.jpg",
  },
  {
    id: "p6",
    title: "Law of Contracts",
    subject: "Law",
    difficulty: "Medium",
    category: "Law",
    image:
      "data:image/jpeg;base64,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",
  },
];

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [problems, setProblems] = useState<Problem[]>(sampleProblems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);
  const [answer, setAnswer] = useState("");
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [askingAI, setAskingAI] = useState(false);

  const categories = ["All", "JEE/NEET", "State Board", "Engineering", "Doctors", "Law"];

  // Fetch problems list from backend
  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/problems`);
        if (!res.ok) {
          throw new Error("Failed to load problems");
        }
        const data = await res.json();
        // Map backend problems into UI shape (no images yet)
        const mapped: Problem[] = data.map((p: any) => ({
          id: String(p.id),
          title: p.title,
          subject: p.category,
          difficulty:
            p.difficulty === "Easy" || p.difficulty === "Medium" || p.difficulty === "Hard"
              ? p.difficulty
              : "Easy",
          category: "JEE/NEET", // fallback; can be refined based on your schema
        }));
        setProblems(mapped);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load problems");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Load full problem details when user selects one
  const handleSelectProblem = async (problemId: string) => {
    setSelectedProblem(null);
    setAnswer("");
    setCheckResult(null);
    setAiExplanation(null);

    try {
      const res = await fetch(`${API_URL}/problems/${problemId}`);
      if (!res.ok) {
        throw new Error("Failed to load problem details");
      }
      const data = await res.json();
      setSelectedProblem(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckAnswer = async () => {
    if (!selectedProblem) return;
    setChecking(true);
    setCheckResult(null);
    try {
      const res = await fetch(`${API_URL}/problems/submit/${selectedProblem.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send auth cookie
        body: JSON.stringify({ answer }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCheckResult(data.error || "Failed to check answer");
      } else {
        setCheckResult(data.result || "Checked");
      }
    } catch (err) {
      console.error(err);
      setCheckResult("Something went wrong while checking the answer.");
    } finally {
      setChecking(false);
    }
  };

  const handleAskAI = async () => {
    if (!selectedProblem) return;
    setAskingAI(true);
    setAiExplanation(null);
    try {
      const questionText =
        selectedProblem.description || selectedProblem.title || "Solve this problem";
      const res = await fetch(`${API_URL}/doubts/solve-problem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, userAnswer: answer }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiExplanation(data.error || "Failed to get AI explanation");
      } else {
        setAiExplanation(data.text || "No explanation returned.");
      }
    } catch (err) {
      console.error(err);
      setAiExplanation("Something went wrong while asking AI.");
    } finally {
      setAskingAI(false);
    }
  };

  const filteredProblems = problems.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.subject || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* 🔍 Search Bar */}
      <div className="flex items-center max-w-md mx-auto mb-6">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for problems, topics, or subjects..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* 🔦 Pointer highlight heading */}
      <PointerHighlightDemo />

      {/* 📌 Category Filter */}
      <div className="flex justify-center gap-3 flex-wrap mt-6 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              selectedCategory === cat
                ? "bg-cyan-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📝 Problem Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-30 max-w-7xl mx-auto">
        {loading && <p className="col-span-full text-center">Loading problems...</p>}
        {error && !loading && (
          <p className="col-span-full text-center text-red-500">{error}</p>
        )}
        {!loading &&
          !error &&
          filteredProblems.map((problem) => (
            <button
              key={problem.id}
              type="button"
              onClick={() => handleSelectProblem(problem.id)}
              className="text-left"
            >
              <FollowerPointerCard
                title={problem.subject || problem.title}
                className="mx-auto w-full max-w-sm"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-700 bg-white transition duration-200 hover:shadow-xl">
                  <div className="p-6 flex flex-col items-start">
                    <h2 className="text-lg font-bold text-black mb-2">
                      {problem.title}
                    </h2>
                    {problem.subject && (
                      <p className="text-sm text-black mb-2">{problem.subject}</p>
                    )}
                    <p className="text-xs text-gray-600 mb-3">
                      Category: {problem.category}
                    </p>

                    <span
                      className={`px-3 py-1 mb-1 rounded-full text-xs font-semibold ${
                        problem.difficulty === "Easy"
                          ? "bg-green-600 text-white"
                          : problem.difficulty === "Medium"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              </FollowerPointerCard>
            </button>
          ))}
      </div>

      {/* Selected Problem Solve Area */}
      {selectedProblem && (
        <div className="max-w-3xl mx-auto mt-10 bg-gray-900 rounded-2xl p-6 border border-zinc-700">
          <h2 className="text-2xl font-semibold mb-2">{selectedProblem.title}</h2>
          {selectedProblem.description && (
            <p className="text-sm text-gray-300 mb-4">{selectedProblem.description}</p>
          )}

          <label className="block text-sm mb-2">
            Your Answer
            <textarea
              className="mt-1 w-full rounded-md bg-gray-800 text-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
          </label>

          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="button"
              onClick={handleCheckAnswer}
              disabled={checking}
              className="px-4 py-2 rounded-md bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 disabled:opacity-60"
            >
              {checking ? "Checking..." : "Check Answer"}
            </button>
            <button
              type="button"
              onClick={handleAskAI}
              disabled={askingAI}
              className="px-4 py-2 rounded-md bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 disabled:opacity-60"
            >
              {askingAI ? "Asking AI..." : "Ask AI for Help"}
            </button>
          </div>

          {checkResult && (
            <p className="mt-3 text-sm text-cyan-300">Result: {checkResult}</p>
          )}

          {aiExplanation && (
            <div className="mt-4 p-3 rounded-md bg-gray-800 text-sm whitespace-pre-wrap">
              {aiExplanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

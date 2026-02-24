document.addEventListener("DOMContentLoaded", function () {
     const jobCards = document.querySelectorAll(".jobCard");
    const interviewCountEl = document.getElementById("interviewCount");
    const rejectedCountEl = document.getElementById("rejectedCount");
    const totalCountEl = document.getElementById("totalCount");
    const jobCountEl = document.getElementById("jobCount");
    const emptyMsg = document.getElementById("emptyMsg");

    const allTab = document.getElementById("allTab");
    const interviewTab = document.getElementById("interviewTab");
    const rejectedTab = document.getElementById("rejectedTab");
    let currentTab = "all";

    function updateDashboard() {

        const allJobs = document.querySelectorAll(".jobCard");
        const interviewJobs = document.querySelectorAll(".jobCard[data-status='interview']");
        const rejectedJobs = document.querySelectorAll(".jobCard[data-status='rejected']");

        totalCountEl.textContent = allJobs.length;
        interviewCountEl.textContent = interviewJobs.length;
        rejectedCountEl.textContent = rejectedJobs.length;

        if (currentTab === "all") {
            jobCountEl.textContent = allJobs.length + " jobs";
        }
        if (currentTab === "interview") {
            jobCountEl.textContent = interviewJobs.length + " jobs";
        }
        if (currentTab === "rejected") {
            jobCountEl.textContent = rejectedJobs.length + " jobs";
        }

        checkEmptyState();
    }
    function checkEmptyState() {
        const visibleCards = document.querySelectorAll(".jobCard:not(.hidden)");
        if (visibleCards.length === 0) {
            emptyMsg.classList.remove("hidden");
        } else {
            emptyMsg.classList.add("hidden");
        }
    }

    function filterTab(tab) {

        currentTab = tab;

        jobCards.forEach(card => {
            const status = card.getAttribute("data-status");

            if (tab === "all") {
                card.classList.remove("hidden");
            }
            else if (tab === "interview") {
                card.classList.toggle("hidden", status !== "interview");
            }
            else if (tab === "rejected") {
                card.classList.toggle("hidden", status !== "rejected");
            }
        });

        updateDashboard();
    }

    // TAB section
    allTab.addEventListener("click", () => filterTab("all"));
    interviewTab.addEventListener("click", () => filterTab("interview"));
    rejectedTab.addEventListener("click", () => filterTab("rejected"));

    // Button section
    document.querySelectorAll(".jobCard").forEach(card => {

        const interviewBtn = card.querySelector(".interviewBtn");
        const rejectBtn = card.querySelector(".rejectBtn");
        const statusTag = card.querySelector(".statusTag");
        const deleteBtn = card.querySelector(".deleteBtn");

        interviewBtn.addEventListener("click", () => {

            if (card.getAttribute("data-status") === "interview") {
                card.removeAttribute("data-status");
                statusTag.textContent = "NOT APPLIED";
                statusTag.className = "statusTag inline-block mt-2 text-sm bg-gray-200 px-3 py-1 rounded";
            } else {
                card.setAttribute("data-status", "interview");
                statusTag.textContent = "INTERVIEW";
                statusTag.className = "statusTag inline-block mt-2 text-sm bg-green-100 text-green-600 px-3 py-1 rounded";
            }

            updateDashboard();
            filterTab(currentTab);
        });

        rejectBtn.addEventListener("click", () => {

            if (card.getAttribute("data-status") === "rejected") {
                card.removeAttribute("data-status");
                statusTag.textContent = "NOT APPLIED";
                statusTag.className = "statusTag inline-block mt-2 text-sm bg-gray-200 px-3 py-1 rounded";
            } else {
                card.setAttribute("data-status", "rejected");
                statusTag.textContent = "REJECTED";
                statusTag.className = "statusTag inline-block mt-2 text-sm bg-red-100 text-red-600 px-3 py-1 rounded";
            }

            updateDashboard();
            filterTab(currentTab);
        });

        deleteBtn.addEventListener("click", () => {
            card.remove();
            updateDashboard();
        });

    });

    updateDashboard();
});
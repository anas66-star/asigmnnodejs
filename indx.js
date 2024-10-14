function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = {
        daysExcludingFridays: [],
        daysWorkedExcludingFridays: [],
        monthlyTargets: [],
        totalTarget: 0
    };

    let currentDate = new Date(start);
    let monthlyDaysCount = {};
    let totalWorkingDays = 0;

    // Count working days per month while excluding Fridays
    while (currentDate <= end) {
        const monthIdentifier = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;
        
        // Skip Fridays 
        if (currentDate.getDay() !== 5) {  
            monthlyDaysCount[monthIdentifier] = (monthlyDaysCount[monthIdentifier] || 0) + 1;
            totalWorkingDays++;
        }
        
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate monthly targets based on counted days
    for (const [monthIdentifier, days] of Object.entries(monthlyDaysCount)) {
        result.daysExcludingFridays.push(days);
        result.daysWorkedExcludingFridays.push(days);

        // Determine the monthly target proportionally
        const monthlyTarget = (days / totalWorkingDays) * totalAnnualTarget;
        result.monthlyTargets.push(monthlyTarget);
    }

    // Sum up all monthly targets to get the total target
    result.totalTarget = result.monthlyTargets.reduce((accumulator, value) => accumulator + value, 0);

    return result; // Return the final results
}

// Example usage:
const output = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
console.log(output);
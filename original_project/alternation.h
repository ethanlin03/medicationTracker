#include "include_files.h"

#ifndef ALTERNATION_H
#define ALTERNATION_H

const int monthDays[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

std::queue<int> alternationDiff()
{
    int amountOfMed;
    int temp;
    std::queue<int> amounts;
    std::cout << "Enter the number of different amounts of said medication needed to be taken: " << std::endl;
    std::cin >> amountOfMed;

    std::cout << "Starting with the first iteration. ";
    for (int i = 1; i <= amountOfMed; i++)
    {
        std::cout << "Please enter the amount of meds for iteration " << i << ":" << std::endl;
        std::cin >> temp;
        amounts.push(temp);
    }
    
    return amounts;
}

int amtOfDays()
{
    int days;
    std::cout << "Please enter the amount of days you want to see for medication: (Type -1 for rest of month)" << std::endl;
    std::cin >> days;

    std::time_t currentTime = std::time(0);   // get time now
    std::tm* now = std::localtime(&currentTime);
    int year = now->tm_year + 1900;
    int mon = now->tm_mon + 1;
    int currDay = now->tm_mday;

    if(days == -1)
    {
        if(mon == 2)
        {
            if(year % 400 == 0)
                return monthDays[mon] - currDay + 1;

            else if(year % 100 == 0)
                return monthDays[mon] - currDay;

            else if(year % 4 == 0)
                return monthDays[mon] - currDay + 1;
        }
        return monthDays[mon] - currDay;
    }
    return days;
}

std::vector<int> amountsPerDay(int days)
{
    std::queue<int> amt = alternationDiff();
    std::vector<int> weekArr;

    for (int i = 0; i < days; i++)
    {
        weekArr.push_back(amt.front());
        amt.push(amt.front());
        amt.pop();
    }
    
    return weekArr;
}
#endif /* ALTERNATION_H */

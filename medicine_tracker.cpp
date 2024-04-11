#include "alternation.h"

int main()
{
    std::time_t current = std::time(0);   // get time now
    std::tm* now = std::localtime(&current);
    int currMon = now->tm_mon + 1;
    int currDay = now->tm_mday;

    int days = amtOfDays();
    int med = 0;
    std::vector<int> medAmt = amountsPerDay(days);
    for (int i = currDay; i < currDay + days; i++)
    {
        if(i > monthDays[currMon - 1])
        {
            currMon++;
            std::cout << currMon << "/" << i - monthDays[currMon] << " has: " << medAmt[med++] << std::endl;
        }

        else
            std::cout << currMon << "/" << i << " has: " << medAmt[med++] << std::endl;
    }
    
    return 0;
}
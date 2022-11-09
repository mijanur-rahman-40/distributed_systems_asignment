// https://www.studocu.com/in/document/dr-apj-abdul-kalam-technical-university/distributed-system/distributed-systems-lab-manual/21745618

#include <stdio.h>
#include <stdlib.h>

struct process
{
    int e;
    int ts[10];
} p[10];

void main()
{
    int i, j, n, m, t, e1, e2;
    char ch;
    // clrscr();
    printf("Enter the no. of process : ");
    scanf("%d", &n);
    for (i = 0; i < n; i++)
    {
        printf("Enter the no. of events in process %d : ", i + 1);
        scanf("%d", &p[i].e);
        for (j = 0; j < p[i].e; j++)
        {
            p[i].ts[j] = j + 1;
        }
    }
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < p[i].e; j++)
            printf("%d ", p[i].ts[j]);
        printf("\n");
    }
    do
    {
        printf("Enter the process no & event no. from which message is passing (less than %d) : ", n);
        scanf("%d %d", &m, &e1);
        printf("Enter the process no & event no. on which message is passing (less than %d) : ", n);
        scanf("%d %d", &t, &e2);
        if ((p[m].ts[e1] + 1) > p[t].ts[e2])
        {
            p[t].ts[e2] = p[m].ts[e1] + 1;
            for (i = e2; i < p[t].e; i++)
            {
                p[t].ts[i + 1] = p[t].ts[i] + 1;
            }
        }
        printf("Is there more message(y/n)\n");
        fflush(0);
        scanf("%c", &ch);
    } while (ch == 'y' && ch == 'Y');

    for (i = 0; i < n; i++)
    {
        for (j = 0; j < p[i].e; j++)
        {
            printf("%d ", p[i].ts[j]);
        }
        printf("\n");
    }
    // getch();
}
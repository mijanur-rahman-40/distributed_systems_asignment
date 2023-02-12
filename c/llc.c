// #include <conio.h>
#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>

int getch(void)
{
    int ch;
    struct termios oldt, newt;

    tcgetattr(STDIN_FILENO, &oldt);
    newt = oldt;
    newt.c_lflag &= ~(ICANON | ECHO);
    tcsetattr(STDIN_FILENO, TCSANOW, &newt);
    ch = getchar();
    tcsetattr(STDIN_FILENO, TCSANOW, &oldt);

    return ch;
}
void main()
{
    int i, j, k;
    int x = 0;
    char a[10][10];
    int n, num[10], b[10][10];
    // clrscr();
    printf("Enter the no. of physical clocks: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++)
    {
        printf("\nNo. of nodes for physical clock %d", i + 1);
        scanf("%d", &num[i]);
        x = 0;
        for (j = 0; j < num[i]; j++)
        {
            printf("\nEnter the name of process: ");
            scanf("%s", &a[i][j]);
            b[i][j] = x + rand() % 10;
            x = b[i][j] + 1;
        }
    }

    printf("\nPress a key for watching timestamp of physical clocks");
    getch();

    // clrscr();
    for (i = 0; i < n; i++)
    {
        printf("Physical Clock%d", i + 1);
        for (j = 0; j < num[i]; j++)
        {
            printf("\nProcess %c", a[i][j]);
            printf(" has P.T. :%d ", b[i][j]);
            printf("\n");
        }
    }

    printf("Press a key for watching timestamp of logical clocks");
    getch();

    // clrscr();

    x = 0;
    for (i = 0; i < 10; i++)
        for (j = 0; j < n; j++)
            for (k = 0; k < num[j]; k++)
                if (b[j][k] == i)
                {
                    x = rand() % 10 + x;
                    printf("Logical Clock Timestamp for process %c", a[j][k]);
                    printf(":%d", x);
                    printf("\n");
                }
    getch();
    return;
}

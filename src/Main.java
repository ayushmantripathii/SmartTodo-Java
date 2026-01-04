import java.time.LocalDate;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        TaskManager manager = new TaskManager();
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n===== SMART TODO MANAGER =====");
            System.out.println("1. Add Task");
            System.out.println("2. View Tasks");
            System.out.println("3. Mark Task Completed");
            System.out.println("4. Delete Task");
            System.out.println("5. Exit");
            System.out.print("Choose: ");

            int choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {

                case 1:
                    System.out.print("Title: ");
                    String title = sc.nextLine();

                    System.out.print("Description: ");
                    String desc = sc.nextLine();

                    System.out.print("Priority (LOW/MEDIUM/HIGH): ");
                    Priority p = Priority.valueOf(sc.nextLine().toUpperCase());

                    System.out.print("Due Date (yyyy-mm-dd): ");
                    LocalDate date = LocalDate.parse(sc.nextLine());

                    manager.addTask(title, desc, p, date);
                    break;

                case 2:
                    manager.viewTasks();
                    break;

                case 3:
                    System.out.print("Enter task id: ");
                    manager.markCompleted(sc.nextInt());
                    break;

                case 4:
                    System.out.print("Enter task id: ");
                    manager.deleteTask(sc.nextInt());
                    break;

                case 5:
    System.out.println("Exiting...");
    sc.close();
    return;


                default:
                    System.out.println("Invalid choice.");
            }
        }
    }
}

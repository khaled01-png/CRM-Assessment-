import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class LeadTracker {

    private static final List<Lead> leads = new ArrayList<>();
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        boolean running = true;

        while (running && scanner.hasNextLine()) {
            printMenu();
            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1" -> addLead();
                case "2" -> viewLeads();
                case "3" -> {
                    System.out.println("Goodbye!");
                    running = false;
                }
                default -> System.out.println("Invalid option. Please enter 1, 2 or 3.");
            }
        }
    }

    private static void printMenu() {
        System.out.println();
        System.out.println("=== Simple Lead Tracker ===");
        System.out.println("1. Add a lead");
        System.out.println("2. View all leads");
        System.out.println("3. Exit");
        System.out.print("Choose an option: ");
    }

    private static void addLead() {
        System.out.print("Name: ");
        String name = readLine();
        System.out.print("Email: ");
        String email = readLine();
        System.out.print("Score (0-100): ");
        String scoreInput = readLine();

        if (name.isEmpty()) {
            System.out.println("Invalid input: name cannot be empty.");
            return;
        }

        if (email.isEmpty()) {
            System.out.println("Invalid input: email cannot be empty.");
            return;
        }

        Integer score = parseScore(scoreInput);
        if (score == null) {
            System.out.println("Invalid input: score must be a whole number from 0 to 100.");
            return;
        }

        leads.add(new Lead(name, email, score));
        System.out.println("Lead added successfully.");
    }

    private static void viewLeads() {
        if (leads.isEmpty()) {
            System.out.println("No leads yet. Choose option 1 to add your first lead.");
            return;
        }

        System.out.println();
        System.out.printf("%-4s %-22s %-28s %-6s %s%n", "No.", "Name", "Email", "Score", "Priority");
        System.out.println("-".repeat(72));

        for (int i = 0; i < leads.size(); i++) {
            Lead lead = leads.get(i);
            System.out.printf("%-4d %-22s %-28s %-6d %s%n",
                    i + 1,
                    lead.name(),
                    lead.email(),
                    lead.score(),
                    calculatePriority(lead.score()));
        }
    }

    static String calculatePriority(int score) {
        if (score >= 80) {
            return "HOT";
        }
        if (score >= 50) {
            return "WARM";
        }
        return "COLD";
    }

    private static Integer parseScore(String text) {
        try {
            int value = Integer.parseInt(text);
            if (value < 0 || value > 100) {
                return null;
            }
            return value;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private static String readLine() {
        return scanner.hasNextLine() ? scanner.nextLine().trim() : "";
    }
}

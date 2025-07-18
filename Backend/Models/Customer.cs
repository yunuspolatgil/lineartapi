namespace Backend.Models;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string? Email { get; set; }
    public string Phone { get; set; }
    public string Type { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? companyName { get; set; }
    
    // type: string;
    // companyName?: string;
}
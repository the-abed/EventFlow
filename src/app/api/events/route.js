import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// In-memory events storage (replace with database in production)
let events = [];
let eventIdCounter = 1;

/**
 * GET /api/events
 * Fetch all events or paginated events
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedEvents = events.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: paginatedEvents,
        pagination: {
          page,
          limit,
          total: events.length,
          totalPages: Math.ceil(events.length / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/events
 * Create a new event (requires authentication)
 */
export async function POST(req) {
  try {
    // Get user session for authentication
    const session = await getServerSession(authOptions);

    // Optional: Uncomment to require authentication
    // if (!session) {
    //   return NextResponse.json(
    //     { success: false, message: "Unauthorized: Please login" },
    //     { status: 401 }
    //   );
    // }

    const body = await req.json();
    const { title, description, date, time, location, capacity, category } =
      body;

    // Validate required fields
    if (!title || !description || !date || !time || !location || !capacity) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: title, description, date, time, location, capacity",
        },
        { status: 400 }
      );
    }

    // Validate field types and values
    if (typeof title !== "string" || title.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Title must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Description must be at least 10 characters",
        },
        { status: 400 }
      );
    }

    if (typeof capacity !== "number" || capacity < 1) {
      return NextResponse.json(
        { success: false, message: "Capacity must be a number greater than 0" },
        { status: 400 }
      );
    }

    // Create new event object
    const newEvent = {
      id: eventIdCounter++,
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      capacity,
      category: category || "other",
      createdAt: new Date().toISOString(),
      attendees: [],
      attendeeCount: 0,
      // Optional: Add user info if authentication is enabled
      // createdBy: session?.user?.email,
    };

    // Add event to storage
    events.push(newEvent);

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        data: newEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create event",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

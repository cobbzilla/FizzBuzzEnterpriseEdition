package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;

/** Names follow Unicode 18.0 UnicodeData and NameAliases; controls are never emitted to a terminal. */
public final class HiddenOccupantRegistry {
    private HiddenOccupantRegistry() { }
    private static final int[] POINTS = {0x00A0, 0x000A, 0x0009, 0x000B, 0x0007, 0x000D, 0x000C, 0x200B, 0xFEFF, 0x2060};
    private static final String[] IDS = {"non-breaking-space", "newline", "tab", "vertical-tab", "bell", "carriage-return", "form-feed", "zero-width-space", "byte-order-mark", "word-joiner"};
    private static final String[] NAMES = {"NO-BREAK SPACE (non-breaking space)", "LINE FEED (newline, LF)", "HORIZONTAL TABULATION (TAB)", "VERTICAL TABULATION (VT)", "ALERT (BEL, historically called bell)", "CARRIAGE RETURN (CR)", "FORM FEED (FF)", "ZERO WIDTH SPACE", "ZERO WIDTH NO-BREAK SPACE (BOM)", "WORD JOINER"};
    private static final String[] EXCUSES = {
        "It insisted that breaking up the room would violate its tenancy agreement.",
        "It had already started a second floor without planning permission.",
        "It claimed several columns while declining to specify how many.",
        "Its application proposed an elevator in a one-line building.",
        "It demanded a doorbell before the company had authorized a door. No sound was played.",
        "It kept returning to reception without checking out.",
        "It requested an entirely new page for a single numerical employee.",
        "It reported zero floor area and nevertheless refused to leave.",
        "It claimed to be a building inspector because its initials appeared on the paperwork.",
        "It had joined the rooms together without consulting Facilities."
    };
    public static int size() { return POINTS.length; }
    public static int point(int index) { return POINTS[index]; }
    public static String id(int index) { return IDS[index]; }
    public static String name(int point) { int index = index(point); return index < 0 ? "UNREGISTERED CHARACTER" : NAMES[index]; }
    public static String excuse(int point) { int index = index(point); return index < 0 ? "No registered hidden-occupant removal procedure covers this character." : EXCUSES[index]; }
    public static boolean recognized(int point) { return index(point) >= 0; }
    public static String character(String id) {
        for (int i = 0; i < IDS.length; i++) if (IDS[i].equals(id)) return String.valueOf((char) POINTS[i]);
        throw new IllegalArgumentException("Unknown hidden occupant.");
    }
    public static String code(int point) {
        String hex = Integer.toHexString(point).toUpperCase(java.util.Locale.ROOT);
        while (hex.length() < 4) hex = "0" + hex;
        return "U+" + hex;
    }
    private static int index(int point) { for (int i = 0; i < POINTS.length; i++) if (POINTS[i] == point) return i; return -1; }
    /** Exactly one in seven positive ordinals; cycling tenants without narrowing an arbitrary-size integer. */
    public static String initialOccupancy(String ordinal) {
        int residue = 0;
        for (int i = 0; i < ordinal.length(); i++) residue = (residue * 10 + ordinal.charAt(i) - '0') % (7 * POINTS.length);
        return residue % 7 == 0 ? String.valueOf((char) POINTS[((residue / 7) + POINTS.length - 1) % POINTS.length]) : "";
    }
}

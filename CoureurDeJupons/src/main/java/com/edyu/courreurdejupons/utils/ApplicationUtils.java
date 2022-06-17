package com.edyu.courreurdejupons.utils;

public class ApplicationUtils {
    public static String pluralize(int count, String singular, String plural) {
        String correctStringVersion = count <= 1 ? singular : plural;
        return String.format("%d %s", count, correctStringVersion);
    }

    public static String pluralize(int count, String singular) {
        String plural = singular + "s";
        String correctStringVersion = count <= 1 ? singular : plural;
        return String.format("%d %s", count, correctStringVersion);
    }
}

package giraffe.miausicbox.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Utils<T> {
	
	public static <T> List<T> removeDuplicated(List<T> list) {
		Set<T> hs = new HashSet<>();
		hs.addAll(list);
		list.clear();
		list.addAll(hs);
		return list;
	}
	
}
